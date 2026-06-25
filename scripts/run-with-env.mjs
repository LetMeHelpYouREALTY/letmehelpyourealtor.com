import fs from "node:fs";
import { spawnSync } from "node:child_process";

const envFile = process.argv[2] ?? ".env.production.local";
if (!fs.existsSync(envFile)) {
  console.error(`Missing ${envFile}`);
  process.exit(1);
}

for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
  const idx = line.indexOf("=");
  if (idx < 0 || line.startsWith("#")) continue;
  const key = line.slice(0, idx).trim();
  let value = line.slice(idx + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  process.env[key] = value;
}

if (!process.env.NOTION_TOKEN) {
  console.error("NOTION_TOKEN not found in env file");
  process.exit(1);
}

const result = spawnSync("node", ["scripts/bootstrap-notion-leads.mjs"], {
  stdio: "inherit",
  env: process.env,
});
process.exit(result.status ?? 1);
