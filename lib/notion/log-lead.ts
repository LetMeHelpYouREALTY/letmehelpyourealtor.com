import { serverEnv } from "@/lib/server-env";

export type NotionLeadPayload = {
  name: string;
  email?: string;
  phone?: string;
  source?: string;
  message?: string;
  fubPersonId?: number;
  tags?: string[];
  channel?: string;
};

/**
 * Append a lead row to Notion when NOTION_TOKEN + NOTION_LEADS_DATABASE_ID are set.
 * Non-blocking — failures are logged only.
 */
export async function logLeadToNotion(payload: NotionLeadPayload): Promise<void> {
  const token = serverEnv.notionToken;
  const databaseId = serverEnv.notionLeadsDatabaseId;
  if (!token || !databaseId) {
    return;
  }

  const title = payload.name || payload.email || payload.phone || "Website lead";

  const properties: Record<string, unknown> = {
    Name: {
      title: [{ text: { content: title.slice(0, 200) } }],
    },
  };

  if (payload.email) {
    properties.Email = { email: payload.email };
  }
  if (payload.phone) {
    properties.Phone = { phone_number: payload.phone.slice(0, 100) };
  }
  if (payload.channel) {
    properties.Channel = {
      rich_text: [{ text: { content: payload.channel.slice(0, 100) } }],
    };
  }
  if (payload.source) {
    properties.Source = {
      rich_text: [{ text: { content: payload.source.slice(0, 200) } }],
    };
  }
  if (payload.message) {
    properties.Message = {
      rich_text: [{ text: { content: payload.message.slice(0, 2000) } }],
    };
  }
  if (payload.fubPersonId) {
    properties["FUB Person ID"] = {
      number: payload.fubPersonId,
    };
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("[notion] log-lead failed", response.status, body);
  }
}
