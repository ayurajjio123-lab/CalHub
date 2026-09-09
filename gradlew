#!/usr/bin/env sh
set -eu
GRADLE_VERSION=8.7
BASE_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
CACHE_DIR="${GRADLE_USER_HOME:-$HOME/.gradle}/wrapper/dists/gradle-${GRADLE_VERSION}-bin"
GRADLE_HOME="$CACHE_DIR/gradle-${GRADLE_VERSION}"
if [ ! -x "$GRADLE_HOME/bin/gradle" ]; then
  mkdir -p "$CACHE_DIR"
  TMP_ZIP="$CACHE_DIR/gradle-${GRADLE_VERSION}-bin.zip"
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL -o "$TMP_ZIP" "https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip"
  else
    echo "curl is required to bootstrap Gradle." >&2
    exit 1
  fi
  rm -rf "$GRADLE_HOME"
  unzip -q "$TMP_ZIP" -d "$CACHE_DIR"
  rm -f "$TMP_ZIP"
fi
exec "$GRADLE_HOME/bin/gradle" "$@"
