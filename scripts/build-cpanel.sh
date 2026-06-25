#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_ZIP="$ROOT/../cpanel-deploy.zip"
API_DIR="$ROOT/app/api"
API_BAK="$ROOT/app/_api_cpanel_bak"

cd "$ROOT"

cleanup() {
  if [ -d "$API_BAK" ]; then
    rm -rf "$API_DIR"
    mv "$API_BAK" "$API_DIR"
  fi
}
trap cleanup EXIT

echo "→ Preparing static export (API routes excluded for cPanel)..."
if [ -d "$API_DIR" ]; then
  rm -rf "$API_BAK"
  mv "$API_DIR" "$API_BAK"
fi

echo "→ Building Next.js static export..."
CPANEL_BUILD=1 npm run build

cat > "$ROOT/out/VERSION.txt" <<VERSION
Peculiar AI — cPanel Static Export
Build: $(date -u +"%Y-%m-%d %H:%M UTC")
Title: Peculiar AI Labs | Building AI That's Different
Match: https://peculiar-ai.vercel.app/
If you see "Kinetic Cybernetic" as the PAGE TITLE (browser tab), wrong zip was uploaded.
Footer may say Kinetic Cybernetic — that is normal on both Vercel and this build.
VERSION

echo "→ Adding LiteSpeed/Apache rules..."
cat > "$ROOT/out/.htaccess" <<'HTACCESS'
# Peculiar AI Labs — cPanel static hosting
DirectoryIndex index.html

# Disable LiteSpeed cache for HTML (prevents old parking page from sticking)
<IfModule LiteSpeed>
  RewriteEngine On
  RewriteRule .* - [E=Cache-Control:no-cache]
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Serve existing files/directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Map extensionless paths to folders (e.g. /demo -> /demo/index.html)
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.+?)/?$ $1.html [L]

  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^(.+?)/?$ $1/index.html [L]
</IfModule>

# Security headers (if mod_headers available)
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
HTACCESS

echo "→ Creating deploy zip..."
rm -f "$OUT_ZIP"
(cd "$ROOT/out" && zip -r "$OUT_ZIP" . -x "*.DS_Store")

echo "✓ Deploy package ready:"
ls -lh "$OUT_ZIP"
echo "  Upload and extract contents into public_html"