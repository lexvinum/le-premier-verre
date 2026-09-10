import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const published = await client.getDocument("producer-domane-wachau");
const draft = await client.getDocument("drafts.producer-domane-wachau");

console.log("\n--- PUBLISHED ---");
console.log(JSON.stringify(published, null, 2));

console.log("\n--- DRAFT ---");
console.log(JSON.stringify(draft, null, 2));
