import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const published = await client.getDocument("producer-campo-viejo");
const draft = await client.getDocument("drafts.producer-campo-viejo");

console.log("\n--- PUBLISHED ---");
console.log(JSON.stringify(published, null, 2));

console.log("\n--- DRAFT ---");
console.log(JSON.stringify(draft, null, 2));
