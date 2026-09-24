import { answer } from "./answer";

export type Check = {
  question: string;
  expectId: string | null;
};

export const checks: Check[] = [
  { question: "When is a missed pickup refunded?", expectId: "refunds" },
  { question: "When do we page the secondary on-call?", expectId: "oncall" },
  { question: "What chunk overlap do we use?", expectId: "chunks" },
  { question: "Can raw phone numbers go to the model?", expectId: "pii" },
  { question: "How much traffic does a canary get?", expectId: "canary" },
  { question: "Who handles a 400 dollar billing dispute?", expectId: "billing" },
  { question: "What is the CEO's favorite lunch?", expectId: null },
];

export function runChecks() {
  return checks.map((check) => {
    const result = answer(check.question);
    const cited = result.hits[0]?.id ?? null;
    const passed = check.expectId === null ? result.refused : cited === check.expectId && !result.refused;
    return { ...check, passed, refused: result.refused, cited, text: result.text };
  });
}
