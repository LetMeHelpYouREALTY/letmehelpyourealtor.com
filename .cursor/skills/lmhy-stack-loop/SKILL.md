---
name: lmhy-stack-loop
description: Boris Cherny-style outer loops for LMHY stack health — advisor, cron, one-fix passes. Use when running /loop on integrations, FUB, Notion, SMS, or /api/health/stack.
---

# LMHY Stack Loop (Loop Engineering)

Inspired by [Boris Cherny's /loop workflows](https://x.com/bcherny/status/2038454341884154269) and [loop engineering](https://addyosmani.com/blog/loop-engineering/): **design the loop, not one-off prompts**.

## Outer loop flow

1. **Discover** — `GET /api/health/stack?advise=1` (production www)
2. **Advise** — Claude advisor returns JSON `actions[]` with `successCriteria`
3. **Fix one** — Implement only the top `effort: "S"` action unless user asks for more
4. **Verify** — Re-hit health endpoint; confirm integration flag flipped
5. **Persist** — Update loop notes in commit message or Notion if configured

## Boris-style Cursor loops (copy/paste)

```text
/loop 1d LMHY stack: GET /api/health/stack?advise=1 on www; fix top advisor action only; verify successCriteria.
```

```text
/loop 6h LMHY engagement: CTAs, lead form, chat widget, mobile sticky on homepage + /contact; one gap per pass.
```

```text
/loop 1d LMHY GSC: validate canonical www on lib/gsc-index-pages.ts URLs; fix duplicate/redirect in GSC only.
```

## Vercel cron (durable outer loop)

- Daily `GET /api/cron/stack-loop` (requires `CRON_SECRET` in Vercel)
- Returns `state.nextPassPrompt` and `cursorLoop` for agent handoff
- Notion bootstrap: `GET /api/cron/bootstrap-notion` when `NOTION_TOKEN` is valid

## Nate-style prompt discipline

When writing advisor or agent prompts: constraints first, single pass, explicit done-when. See `lib/prompts/stack-advisor-prompt.ts`.

## Maker-checker

After any stack fix, the **checker** step is mandatory: production health JSON must show improvement before closing the loop pass.
