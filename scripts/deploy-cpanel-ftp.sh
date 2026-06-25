#!/usr/bin/env bash
# Upload cpanel-deploy.zip to Namecheap cPanel via FTP, extract into public_html.
#
# Usage (credentials via env — do not commit these):
#   export CPANEL_FTP_HOST="ftp.peculiarailabs.com"   # or server hostname from cPanel
#   export CPANEL_FTP_USER="pecuoupq"
#   export CPANEL_FTP_PASS="your-password"
#   bash scripts/deploy-cpanel-ftp.sh
#
# Optional:
#   CPANEL_FTP_PORT=21
#   CPANEL_REMOTE_DIR=public_html
#   CPANEL_ZIP=/path/to/cpanel-deploy.zip

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ZIP="${CPANEL_ZIP:-$ROOT/../cpanel-deploy.zip}"
REMOTE_DIR="${CPANEL_REMOTE_DIR:-public_html}"
PORT="${CPANEL_FTP_PORT:-21}"

: "${CPANEL_FTP_HOST:?Set CPANEL_FTP_HOST (cPanel → FTP Accounts → FTP Server)}"
: "${CPANEL_FTP_USER:?Set CPANEL_FTP_USER (usually pecuoupq)}"
: "${CPANEL_FTP_PASS:?Set CPANEL_FTP_PASS}"

if [ ! -f "$ZIP" ]; then
  echo "Missing zip: $ZIP — run: npm run build:cpanel"
  exit 1
fi

SIZE=$(du -h "$ZIP" | cut -f1)
echo "→ Uploading $ZIP ($SIZE) to $CPANEL_FTP_HOST:$REMOTE_DIR/"

# curl FTP upload (works on macOS without lftp)
curl --ftp-create-dirs --ftp-pasv -T "$ZIP" \
  "ftp://${CPANEL_FTP_USER}:${CPANEL_FTP_PASS}@${CPANEL_FTP_HOST}:${PORT}/${REMOTE_DIR}/cpanel-deploy.zip"

echo "✓ Upload complete."
echo ""
echo "Next — in cPanel File Manager:"
echo "  1. Open $REMOTE_DIR"
echo "  2. Delete old files (index.html, assets/, styles.css, etc.) if any remain"
echo "  3. Select cpanel-deploy.zip → Extract"
echo "  4. Confirm index.html, _next/, VERSION.txt are directly in $REMOTE_DIR"
echo "  5. LiteSpeed → Flush cache (or hard refresh peculiarailabs.com)"
echo ""
echo "Verify: https://peculiarailabs.com/VERSION.txt should show today's build date."