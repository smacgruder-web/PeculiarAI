#!/usr/bin/env python3
"""Append a day blurb to Media-Factory/landing/content.json for review.

Live /vets updates ship via PeculiarAI git → Vercel, not this JSON alone.
Usage:
  python3 push-landing.py --day 6 --hook "Local first, or it is theater." \\
    --blurb "The tool that didn't make me feel weak." --format Video --date 2026-09-04
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONTENT = ROOT / "content.json"


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--day", type=int, required=True)
    p.add_argument("--hook", required=True)
    p.add_argument("--blurb", required=True)
    p.add_argument("--format", default="Video")
    p.add_argument("--date", required=True)
    p.add_argument("--url", default="https://peculiar-ai.vercel.app/vets#blog")
    args = p.parse_args()

    rows = []
    if CONTENT.exists():
        rows = json.loads(CONTENT.read_text())
    rows = [r for r in rows if r.get("day") != args.day]
    rows.append(
        {
            "day": args.day,
            "date": args.date,
            "hook": args.hook,
            "blurb": args.blurb,
            "format": args.format,
            "url": args.url,
            "repo_note": "Live page: edit /Users/ll/PeculiarAI/app/vets/page.tsx then git push",
        }
    )
    rows.sort(key=lambda r: r["day"])
    CONTENT.write_text(json.dumps(rows, indent=2) + "\n")
    print(f"Wrote {CONTENT} (day {args.day})")
    print("Next: commit PeculiarAI Day block + Vercel deploy for live /vets")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
