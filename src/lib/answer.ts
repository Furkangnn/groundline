import { retrieve, tokens, type Hit } from "./retrieve";

export type GroundedAnswer = {
  refused: boolean;
  text: string;
  hits: Hit[];
};

const MIN_SCORE = 1.15;

export function answer(query: string): GroundedAnswer {
  const trimmed = query.trim();
  if (!trimmed) {
    return { refused: true, text: "Ask something about the Atlas Freight documents.", hits: [] };
  }
  const hits = retrieve(trimmed, 3);
  const best = hits[0];
  if (!best || best.score < MIN_SCORE) {
    return {
      refused: true,
      text: "That is not in the documents. Groundline will not guess.",
      hits,
    };
  }
  const wanted = new Set(tokens(trimmed));
  const sentences = best.text
    .split(/(?<=[.])\s+/)
    .map((sentence) => ({
      sentence,
      overlap: tokens(sentence).filter((term) => wanted.has(term)).length,
    }))
    .sort((left, right) => right.overlap - left.overlap);
  const chosen = sentences.filter((item) => item.overlap > 0).slice(0, 2);
  const body = (chosen.length ? chosen : sentences.slice(0, 1))
    .map((item) => item.sentence)
    .join(" ");
  return {
    refused: false,
    text: `${body} [${best.id}]`,
    hits,
  };
}
