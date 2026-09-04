# Wav2Lip — local run sheet (not on Grok sandbox)

This machine / cloud agent cannot run Wav2Lip. Run on **your GPU box**.

## Check host

```bash
python3 --version
ffmpeg -version
nvidia-smi          # NVIDIA
# Mac:
system_profiler SPDisplaysDataType | head
```

## Recommended stack (2026): Easy-Wav2Lip v8.3

Do **not** start with the 2020 Rudrabha repo (old Python/CUDA fights).

```bash
git clone https://github.com/anothermartz/Easy-Wav2Lip.git
cd Easy-Wav2Lip
python3.10 -m venv ../ew2l
source ../ew2l/bin/activate   # Windows: ..\ew2l\Scripts\activate
pip install -r requirements.txt
python install.py
```

Needs CUDA 12.2 (NVIDIA) or MPS on supported Macs. Prefer Python **3.10**.

## Day 6 files

| Role | Path |
|------|------|
| Marcus idle | `/Users/ll/PeculiarAI/public/media/host-marcus.jpg` (or short locked-off clip) |
| Sienna idle | `/Users/ll/PeculiarAI/public/media/host-sienna.jpg` |
| Scripts / wav | Record TTS from `landing/home-player-day6.md` → `out/day6/*.wav` |
| Output | `Media-Factory/out/day6/marcus-day6.mp4` etc. |

Only faces you own or that sat for the idle clip.

## After sync

1. Drop mp4s into day’s folder  
2. Queue captions (`social/captions.md`)  
3. Say **Public** in Buffer / Meta / YT  
4. Commit PeculiarAI if player URLs change → Vercel
