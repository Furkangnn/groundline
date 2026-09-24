import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24">
      <h1 className="font-heading text-5xl tracking-tight">This page is not in the documents.</h1>
      <Link href="/" className="mt-6 inline-block text-sm underline">
        Back to Groundline
      </Link>
    </main>
  );
}
