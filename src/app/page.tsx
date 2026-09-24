import { AskPanel } from "@/components/ask-panel";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Furkan Gönen · retrieval</p>
      <h1 className="mt-3 max-w-3xl font-heading text-5xl tracking-tight md:text-7xl">Groundline</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Ask the Atlas Freight handbook. Every answer is a sentence from a retrieved passage, or a refusal. The bench checks both.
      </p>
      <div className="mt-10">
        <AskPanel />
      </div>
    </main>
  );
}
