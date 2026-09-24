import { passages, type Passage } from "./corpus";

const STOP = new Set([
  "a", "an", "the", "is", "are", "was", "were", "to", "of", "and", "or", "for",
  "in", "on", "at", "by", "with", "from", "that", "this", "it", "we", "you",
  "do", "does", "what", "when", "who", "how", "if", "not", "be",
]);

export function tokens(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((token) => token.length > 1 && !STOP.has(token));
}

type Scored = Passage & { score: number };

function bm25(query: string, docs: Passage[]): Scored[] {
  const q = tokens(query);
  const docsTokens = docs.map((doc) => tokens(`${doc.title} ${doc.text}`));
  const avg =
    docsTokens.reduce((sum, row) => sum + row.length, 0) / docsTokens.length;
  const df = new Map<string, number>();
  for (const row of docsTokens) {
    for (const term of new Set(row)) {
      df.set(term, (df.get(term) ?? 0) + 1);
    }
  }
  const k = 1.4;
  const b = 0.75;
  return docs
    .map((doc, index) => {
      const row = docsTokens[index];
      const tf = new Map<string, number>();
      for (const term of row) tf.set(term, (tf.get(term) ?? 0) + 1);
      let score = 0;
      for (const term of q) {
        const freq = tf.get(term) ?? 0;
        if (!freq) continue;
        const n = df.get(term) ?? 0;
        const idf = Math.log(1 + (docs.length - n + 0.5) / (n + 0.5));
        const norm = freq * (k + 1);
        const denom = freq + k * (1 - b + (b * row.length) / avg);
        score += idf * (norm / denom);
      }
      return { ...doc, score };
    })
    .sort((left, right) => right.score - left.score);
}

export type Hit = {
  id: string;
  title: string;
  source: string;
  text: string;
  score: number;
};

export function retrieve(query: string, limit = 3): Hit[] {
  return bm25(query, passages)
    .filter((hit) => hit.score > 0)
    .slice(0, limit)
    .map((hit) => ({
      id: hit.id,
      title: hit.title,
      source: hit.source,
      text: hit.text,
      score: Math.round(hit.score * 100) / 100,
    }));
}
