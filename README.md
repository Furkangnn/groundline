# Groundline

A document assistant that answers only from the passages it retrieved, and says so when the fact is missing.

Recruiters can try it in a minute. There is no API key. Retrieval is BM25 over a small company handbook. The answer is copied from the winning passage and tagged with its id. A fixed bench checks seven questions, including one the corpus cannot answer.

## Run

```bash
npm install
npm run dev -- --port 43127
npm test
```

`npm test` runs the golden questions. Six must cite the right passage. The question about the CEO's lunch must be refused.

## What to read

- `src/lib/retrieve.ts` ranks passages with BM25.
- `src/lib/answer.ts` refuses when the best score is weak, then quotes the matching sentences.
- `src/lib/evalset.ts` is the bench.
- `src/lib/corpus.ts` is the handbook: refunds, on-call, chunking, PII, canaries, billing.

## Why it is built this way

A chat box that invents an answer looks finished and is not. Groundline shows the retrieved text, the score, and the decision to stop. That is the part of a RAG system you can defend in an interview: what was retrieved, what was cited, and what was refused.
