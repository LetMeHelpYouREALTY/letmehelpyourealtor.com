# DrDuffy@LetMeHelpYouRealtor.com — Email Routing

Forwards inbound mail to `FORWARD_TO` (default: `homes@heyberkshire.com`).

## One-time Cloudflare setup

Run from repo root. Replace account/domain if needed.

```bash
# 1. Enable Email Routing + Sending on the domain
npx wrangler email routing enable letmehelpyourealtor.com
npx wrangler email sending enable letmehelpyourealtor.com

# 2. Verify the forward destination (required for message.forward)
npx wrangler email routing addresses create homes@heyberkshire.com

# 3. Deploy this worker
pnpm run email:deploy

# 4. Route DrDuffy@ to the worker (after deploy — use worker name from wrangler.jsonc)
npx wrangler email routing rules create \
  --zone letmehelpyourealtor.com \
  --matcher "DrDuffy@LetMeHelpYouRealtor.com" \
  --action worker \
  --worker letmehelpyourealtor-email
```

If `routing rules create` flags differ in your Wrangler version, use **Dashboard → Email Service → Email Routing → Routing rules**:
- **Custom address:** `DrDuffy@LetMeHelpYouRealtor.com`
- **Action:** Send to Worker → `letmehelpyourealtor-email`

## Change forward destination

Edit `FORWARD_TO` in `wrangler.jsonc`, verify the new address with `wrangler email routing addresses create`, then redeploy.

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm run email:dev` | Local worker (forwarding still needs verified destinations in prod) |
| `pnpm run email:deploy` | Deploy to Cloudflare |

## DNS

Ensure MX records for `letmehelpyourealtor.com` point to Cloudflare Email Routing (`wrangler email routing dns get letmehelpyourealtor.com`).
