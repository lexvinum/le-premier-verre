import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

await client
  .patch("appellation-igp-vin-du-quebec")
  .set({
    region: {
      _type: "reference",
      _ref: "region-quebec"
    }
  })
  .commit();

console.log("✓ IGP Vin du Québec → région Québec");
