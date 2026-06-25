#!/usr/bin/env node
/**
 * Bootstrap Notion leads database for LMHY.
 * Usage: NOTION_TOKEN=secret_xxx node scripts/bootstrap-notion-leads.mjs
 *
 * Creates "LMHY Website Leads" if not found, prints NOTION_LEADS_DATABASE_ID for Vercel.
 */

const NOTION_VERSION = "2022-06-28";
const DB_TITLE = "LMHY Website Leads";

const token = process.env.NOTION_TOKEN;
if (!token) {
  console.error("Set NOTION_TOKEN (same value as Vercel).");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  "Notion-Version": NOTION_VERSION,
  "Content-Type": "application/json",
};

async function notion(path, options = {}) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${res.status} ${path}: ${text}`);
  }
  return text ? JSON.parse(text) : null;
}

async function findExistingDatabase() {
  const data = await notion("/search", {
    method: "POST",
    body: JSON.stringify({
      query: DB_TITLE,
      filter: { property: "object", value: "database" },
      page_size: 10,
    }),
  });

  for (const item of data.results ?? []) {
    const title =
      item.title?.map((t) => t.plain_text).join("") ??
      item.properties?.Name?.title?.[0]?.plain_text;
    if (title === DB_TITLE || item.id) {
      if (
        item.object === "database" &&
        (item.title?.[0]?.plain_text === DB_TITLE ||
          item.title?.map((t) => t.plain_text).join("") === DB_TITLE)
      ) {
        return item.id;
      }
    }
  }

  for (const item of data.results ?? []) {
    if (item.object === "database") {
      const title = item.title?.map((t) => t.plain_text).join("") ?? "";
      if (title.includes("LMHY") && title.toLowerCase().includes("lead")) {
        return item.id;
      }
    }
  }

  return null;
}

async function createDatabase() {
  const body = {
    parent: { type: "workspace", workspace: true },
    title: [{ type: "text", text: { content: DB_TITLE } }],
    properties: {
      Name: { title: {} },
      Email: { email: {} },
      Phone: { phone_number: {} },
      Source: { rich_text: {} },
      Message: { rich_text: {} },
      Channel: { rich_text: {} },
      "FUB Person ID": { number: { format: "number" } },
      Status: {
        select: {
          options: [
            { name: "New", color: "blue" },
            { name: "Contacted", color: "yellow" },
            { name: "Qualified", color: "green" },
            { name: "Closed", color: "gray" },
          ],
        },
      },
    },
  };

  const db = await notion("/databases", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return db.id;
}

async function main() {
  let databaseId = await findExistingDatabase();

  if (databaseId) {
    console.log(`Found existing database: ${databaseId}`);
  } else {
    databaseId = await createDatabase();
    console.log(`Created database: ${databaseId}`);
  }

  console.log("\nAdd to Vercel (Production + Preview):");
  console.log(`NOTION_LEADS_DATABASE_ID=${databaseId}`);
  console.log("\nThen redeploy and verify: GET /api/health/stack?advise=1");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
