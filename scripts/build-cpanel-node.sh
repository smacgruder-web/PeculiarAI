#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGING="$ROOT/.cpanel-node-staging"
OUT_FULL="$ROOT/../cpanel-node-deploy.zip"
OUT_PARTS_DIR="$ROOT/../cpanel-node-parts"
SPLIT_SIZE="4m"

cd "$ROOT"

echo "→ Building Next.js standalone (full app + API routes)..."
npm run build

STANDALONE="$ROOT/.next/standalone"
if [ ! -f "$STANDALONE/server.js" ]; then
  echo "✗ Standalone server.js not found."
  exit 1
fi

echo "→ Staging package..."
rm -rf "$STAGING"
mkdir -p "$STAGING"
cp -R "$STANDALONE/." "$STAGING/"
cp -R "$ROOT/public" "$STAGING/public"
mkdir -p "$STAGING/.next"
cp -R "$ROOT/.next/static" "$STAGING/.next/static"
cp "$ROOT/deploy/cpanel/.env.cpanel.example" "$STAGING/.env.example"
cp "$ROOT/deploy/cpanel/SETUP.txt" "$STAGING/SETUP.txt"

cat > "$STAGING/start.sh" <<'START'
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
export NODE_ENV=production
export PORT="${PORT:-3000}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
node server.js
START
chmod +x "$STAGING/start.sh"

echo "→ Creating full zip (max compression)..."
rm -f "$OUT_FULL"
(cd "$STAGING" && zip -r -9 "$OUT_FULL" . -x "*.DS_Store" >/dev/null)
FULL_SIZE=$(ls -lh "$OUT_FULL" | awk '{print $5}')
echo "  Full: $OUT_FULL ($FULL_SIZE)"

echo "→ Creating split parts (~7 MB each for File Manager)..."
rm -rf "$OUT_PARTS_DIR"
mkdir -p "$OUT_PARTS_DIR"
cp "$OUT_FULL" "$OUT_PARTS_DIR/peculiar-full.zip"
(
  cd "$OUT_PARTS_DIR"
  zip -9 -s "$SPLIT_SIZE" peculiar-full.zip --out peculiar-part >/dev/null
  rm -f peculiar-full.zip
)

cat > "$OUT_PARTS_DIR/REASSEMBLE.txt" <<'REASSEMBLE'
UPLOAD ALL of these files into the SAME folder (e.g. peculiar-ai/):
  peculiar-part.zip
  peculiar-part.z01
  peculiar-part.z02  (and .z03 etc. if present)

Then in cPanel → Terminal (or SSH):

  cd ~/peculiar-ai
  zip -F peculiar-part.zip --out deploy.zip
  unzip -o deploy.zip
  rm -f peculiar-part.z* peculiar-part.zip deploy.zip

Confirm server.js exists, then configure Setup Node.js App.
REASSEMBLE

cp "$ROOT/deploy/cpanel/SETUP.txt" "$OUT_PARTS_DIR/SETUP.txt"

echo "  Parts ($(ls -1 "$OUT_PARTS_DIR" | wc -l | tr -d ' ') files):"
ls -lh "$OUT_PARTS_DIR"

echo ""
echo "✓ If File Manager upload fails on the full zip, use ONE of these:"
echo "  1. FTP upload:        $OUT_FULL"
echo "  2. Split parts:       $OUT_PARTS_DIR/  (upload all, reassemble in Terminal)"
echo "  3. Static fallback:   npm run build:cpanel  → cpanel-deploy.zip (~8 MB)"