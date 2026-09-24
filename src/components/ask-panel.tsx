"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { answer } from "@/lib/answer";
import { passages } from "@/lib/corpus";
import { runChecks } from "@/lib/evalset";

const samples = [
  "When is a missed pickup refunded?",
  "Can raw phone numbers go to the model?",
  "What is the CEO's favorite lunch?",
];

export function AskPanel() {
  const [query, setQuery] = useState(samples[0]);
  const [asked, setAsked] = useState(samples[0]);
  const [showEval, setShowEval] = useState(false);

  const result = useMemo(() => answer(asked), [asked]);
  const report = useMemo(() => (showEval ? runChecks() : []), [showEval]);
  const passed = report.filter((row) => row.passed).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setAsked(query);
          }}
        >
          <label className="text-sm text-muted-foreground" htmlFor="question">
            Question
          </label>
          <Textarea
            id="question"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mt-2 min-h-28 text-base"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="submit">Ask the documents</Button>
            <Button type="button" variant="outline" onClick={() => setShowEval((value) => !value)}>
              {showEval ? "Hide the bench" : "Run the bench"}
            </Button>
          </div>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {samples.map((sample) => (
            <Button
              key={sample}
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setQuery(sample);
                setAsked(sample);
              }}
            >
              {sample}
            </Button>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Answer</p>
          <p className="mt-3 text-xl leading-relaxed">{result.text}</p>
          {result.refused ? (
            <Badge className="mt-4" variant="secondary">
              Refused
            </Badge>
          ) : (
            <Badge className="mt-4">Cited {result.hits[0]?.id}</Badge>
          )}
        </div>
        {showEval ? (
          <ul className="mt-8 divide-y divide-border border-y border-border">
            <li className="py-3 text-sm text-muted-foreground">
              {passed} of {report.length} golden questions passed
            </li>
            {report.map((row) => (
              <li key={row.question} className="py-3 text-sm">
                <span className={row.passed ? "text-emerald-700" : "text-red-700"}>
                  {row.passed ? "Pass" : "Fail"}
                </span>
                <span className="ml-2">{row.question}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
      <section>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Retrieved passages</p>
        <ul className="mt-3 space-y-3">
          {(result.hits.length ? result.hits : []).map((hit, index) => (
            <li key={hit.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">
                  {index + 1}. {hit.title}
                </p>
                <Badge variant="secondary">{hit.score}</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{hit.source}</p>
              <p className="mt-3 text-sm leading-relaxed">{hit.text}</p>
            </li>
          ))}
          {result.hits.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
              Nothing in the corpus matched.
            </li>
          ) : null}
        </ul>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Corpus · {passages.length} passages
        </p>
      </section>
    </div>
  );
}
