import { serverEnv } from "@/lib/server-env";

const NOTION_VERSION = "2022-06-28";
const DB_TITLE = "LMHY Website Leads";

type NotionSearchResponse = {
  results: Array<{
    object: string;
    id: string;
    title?: Array<{ plain_text: string }>;
  }>;
};

async function notionRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = serverEnv.notionToken;
  if (!token) {
    throw new Error("NOTION_TOKEN not configured");
  }

  const response = await fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Notion ${response.status}: ${text}`);
  }

  return text ? (JSON.parse(text) as T) : ({} as T);
}

export async function findLmhyLeadsDatabaseId(): Promise<string | null> {
  const data = await notionRequest<NotionSearchResponse>("/search", {
    method: "POST",
    body: JSON.stringify({
      query: DB_TITLE,
      filter: { property: "object", value: "database" },
      page_size: 20,
    }),
  });

  for (const item of data.results ?? []) {
    if (item.object !== "database") continue;
    const title = item.title?.map((t) => t.plain_text).join("") ?? "";
    if (title === DB_TITLE || title.toLowerCase().includes("lmhy")) {
      return item.id;
    }
  }

  return null;
}

export async function createLmhyLeadsDatabase(): Promise<string> {
  const db = await notionRequest<{ id: string }>("/databases", {
    method: "POST",
    body: JSON.stringify({
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
    }),
  });

  return db.id;
}

export async function ensureLmhyLeadsDatabase(): Promise<{
  databaseId: string;
  created: boolean;
}> {
  const existing = serverEnv.notionLeadsDatabaseId ?? (await findLmhyLeadsDatabaseId());
  if (existing) {
    return { databaseId: existing, created: false };
  }

  const databaseId = await createLmhyLeadsDatabase();
  return { databaseId, created: true };
}
