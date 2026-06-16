# DrDuffy@LetMeHelpYouRealtor.com — Email Routing

Public contact: **DrDuffy@LetMeHelpYouRealtor.com**

Inbound mail hits this Worker. Set **`FORWARD_TO`** (Wrangler secret) to a **different** verified inbox where you read mail (Gmail, Outlook, etc.). Do not set `FORWARD_TO` to the same address as `INBOUND_ADDRESS` — that creates a loop.

## One-time Cloudflare setup

Run from repo root.

```bash
# 1. Enable Email Routing + Sending on the domain
npx wrangler email routing enable letmehelpyourealtor.com
npx wrangler email sending enable letmehelpyourealtor.com

# 2. Verify your personal inbox (where forwarded mail should land)
npx wrangler email routing addresses create you@gmail.com

# 3. Set forward destination (must differ from DrDuffy@LetMeHelpYouRealtor.com)
npx wrangler secret put FORWARD_TO

# 4. Deploy this worker
pnpm run email:deploy

# 5. Route DrDuffy@ to the worker
npx wrangler email routing rules create \
  --zone letmehelpyourealtor.com \
  --matcher "DrDuffy@LetMeHelpYouRealtor.com" \
  --action worker \
  --worker letmehelpyourealtor-email
```

If CLI flags differ, use **Dashboard → Email Service → Email Routing → Routing rules**:
- **Custom address:** `DrDuffy@LetMeHelpYouRealtor.com`
- **Action:** Send to Worker → `letmehelpyourealtor-email`

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm run email:dev` | Local worker |
| `pnpm run email:deploy` | Deploy to Cloudflare |

## DNS

Ensure MX records for `letmehelpyourealtor.com` point to Cloudflare Email Routing (`wrangler email routing dns get letmehelpyourealtor.com`).
