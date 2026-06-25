# LMHY Agent Loop State

Durable outer-loop state for letmehelpyourealtor.com. Updated by daily cron and agent passes.

**Last updated:** _(run `/api/cron/stack-loop` or `/api/health/stack?advise=1`)_

## Active loops (Boris Cherny pattern)

| Loop | Interval | Prompt |
|------|----------|--------|
| Stack health | `1d` | Fix top item from `/api/health/stack?advise=1` |
| Engagement | `1d` | CTAs, forms, chat, mobile sticky |
| GSC canonicals | `6h` | www canonicals on priority URLs |

## Current priority

_Check advisor output — do not edit manually unless cron is down._

## Success criteria (current pass)

- [ ] `/api/health/stack` integration count increased OR advisor confirms green
- [ ] `pnpm run type-check` passes after code changes
- [ ] Production deploy verified on www

## References

- [Cursor agent best practices](https://cursor.com/blog/agent-best-practices)
- [Loop engineering (Addy Osmani)](https://addyosmani.com/blog/loop-engineering/)
- [Boris Cherny on /loop](https://x.com/bcherny/status/2038454341884154269)
- [Karpathy LLM Wiki idea file](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
