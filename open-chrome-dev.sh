#!/bin/bash

# Chrome Dev Script - Opens Chrome with disabled web security for API testing
# This allows CORS and other security restrictions to be bypassed for local development

# Path to your HTML file (relative to this script's location)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HTML_FILE="$SCRIPT_DIR/BYFORCE-2026.html"

# Create a temporary user data directory for this session
USER_DATA_DIR="/tmp/chrome-dev-session-$$"

# Open Chrome with disabled web security
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --disable-web-security \
  --user-data-dir="$USER_DATA_DIR" \
  --disable-features=VizDisplayCompositor \
  --allow-running-insecure-content \
  --disable-site-isolation-trials \
  "file://$HTML_FILE" \
  > /dev/null 2>&1 &

echo "Chrome opened with web security disabled"
echo "Opening: $HTML_FILE"
echo "User data directory: $USER_DATA_DIR"
echo ""
echo "Note: Close Chrome completely when done to clean up the temporary session"

