import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "bb61af16-e4c6-42ad-968c-edd0752d054c";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);
const draft = await client.getDocument(draftId);

console.log("\n--- PUBLISHED ---");
console.log(JSON.stringify(published, null, 2));

console.log("\n--- DRAFT ---");
console.log(JSON.stringify(draft, null, 2));
