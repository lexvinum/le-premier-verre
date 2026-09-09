import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const articleId =
  "article-comment-choisir-une-bouteille-quand-on-ne-connait-rien-au-vin";

async function run() {
  const article = await client.getDocument(articleId);

  if (!article || !Array.isArray(article.content)) {
    throw new Error("Article ou contenu introuvable.");
  }

  const getText = (block: any) =>
    Array.isArray(block?.children)
      ? block.children.map((child: any) => child?.text || "").join("").trim()
      : "";

  const start = article.content.findIndex(
    (block: any) =>
      getText(block).toLowerCase() === "le raccourci du premier verre"
  );

  const end = article.content.findIndex(
    (block: any, index: number) =>
      index > start &&
      getText(block).toLowerCase() ===
        "une bouteille que tu n’aimes pas, ça compte aussi"
  );

  if (start < 0 || end < 0) {
    throw new Error(
      `Section introuvable correctement. start=${start}, end=${end}`
    );
  }

  const content = [
    ...article.content.slice(0, start),
    ...article.content.slice(end),
  ];

  await client.patch(articleId).set({ content }).commit();

  console.log("✅ « Le raccourci du Premier Verre » supprimé.");
  console.log("✓ OCCASION + STYLE + BUDGET supprimé");
  console.log("✓ Les trois puces supprimées");
  console.log("✓ L'article enchaîne directement après les six vins");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
