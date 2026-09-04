# Media Factory — Peculiar AI Labs

Create media → queue social (YT / IG / FB) → push landing updates.  
**Does not** auto-press Public without Buffer/Meta/YouTube credentials.

## Live targets

| Surface | URL |
|---------|-----|
| HQ | https://peculiarailabs.com/ |
| Veterans | https://peculiar-ai.vercel.app/vets |
| Blog anchor | https://peculiar-ai.vercel.app/vets#blog |
| Day 6 | https://peculiar-ai.vercel.app/vets#day-6 (after deploy) |

Source app: `/Users/ll/PeculiarAI`  
Social queue scripts: `/Users/ll/social_blitz`

## Folders

| Path | Role |
|------|------|
| `social/` | Captions + 30-day hooks |
| `landing/` | Copy blocks for /vets + home player |
| `wav2lip/` | Local lip-sync run sheet |
| `prompts/` | Image / meme / slide prompts |
| `out/dayN/` | Generated assets for that day |

## Day command (manual publish)

1. Take hook from `social/captions.md` or `social_blitz/30_day_calendar.json`
2. Generate stills from `prompts.md` (Grok / Imagine)
3. Optional: Wav2Lip → `out/dayN/*.mp4` (see `wav2lip/wav2lip-local.md`)
4. Queue in Buffer / Meta / YT Studio — say **Public** when ready
5. Landing: commit PeculiarAI → Vercel rebuilds both domains

## PAL-CTRL bridge

Idea packets → Desktop `Idea-Inbox` → OS hub **Idea Inbox** → Internal Memo (prototype → Lester).  
Market checks → `Idea-Inbox/CHECK-PROMPT.md`.
