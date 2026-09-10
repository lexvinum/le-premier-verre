import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19", perspective: "raw" });

for (const id of [
  "wine-les-pervenches-seyval-chardo-2025",
  "drafts.wine-les-pervenches-seyval-chardo-2025"
]) {
  const doc = await client.getDocument(id);

  console.log("\n" + id);
  console.log(JSON.stringify({
    exists: !!doc,
    harvestMethod: doc?.harvestMethod,
    vinification: doc?.vinification
  }, null, 2));
}
