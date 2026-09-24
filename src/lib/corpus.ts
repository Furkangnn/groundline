export type Passage = {
  id: string;
  title: string;
  source: string;
  text: string;
};

export const passages: Passage[] = [
  {
    id: "refunds",
    title: "Missed pickups",
    source: "Atlas Freight / policy / refunds.md",
    text: "A missed pickup is refunded only when the driver marks the stop as missed. The refund window is 5 days from that mark. If the customer was absent, the stop is a failed delivery, not a missed pickup, and no refund is issued. Partial loads are refunded for the uncollected weight only.",
  },
  {
    id: "oncall",
    title: "On-call paging",
    source: "Atlas Freight / ops / on-call.md",
    text: "The primary on-call answers pages. If the primary has not acknowledged within 10 minutes, page the secondary. After a second 10 minutes, page the engineering manager. Never page the whole channel for a single delayed stop.",
  },
  {
    id: "chunks",
    title: "How we chunk documents",
    source: "Atlas Freight / ml / retrieval.md",
    text: "Customer documents are split into 512-token chunks with a 64-token overlap. The embedding model is harbor-small. We keep the chunk title and the source path beside the vector so an answer can cite the file, not only a score.",
  },
  {
    id: "pii",
    title: "What may reach the model",
    source: "Atlas Freight / security / pii.md",
    text: "Raw phone numbers never go to the model. Redact them to the last two digits before retrieval. Names of drivers may stay. Payment card numbers are dropped entirely, not masked.",
  },
  {
    id: "canary",
    title: "Canary deploys",
    source: "Atlas Freight / platform / release.md",
    text: "A canary receives 10 percent of traffic for 30 minutes. Promote only if the error rate stays under 0.5 percent and p95 latency does not rise by more than 40 milliseconds. Otherwise roll back automatically.",
  },
  {
    id: "billing",
    title: "Billing disputes",
    source: "Atlas Freight / support / disputes.md",
    text: "Support handles billing disputes up to 200 dollars. A dispute over 200 dollars goes to finance, not to the on-call engineer. Finance replies within 2 business days.",
  },
  {
    id: "refuse",
    title: "When the assistant must refuse",
    source: "Atlas Freight / ml / grounding.md",
    text: "If the retrieved passages do not contain the fact, the assistant says it is not in the documents. It does not guess office passwords, private compensation, or a customer's address. A refusal is a successful answer.",
  },
];
