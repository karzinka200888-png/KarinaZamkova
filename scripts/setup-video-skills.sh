#!/usr/bin/env bash
# Installs everything the video skills in .claude/skills need.
# Safe to run again: every step skips what is already in place.
# Usage: bash scripts/setup-video-skills.sh   (from anywhere)
set -uo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OM_DIR="${OPENMONTAGE_DIR:-$HOME/OpenMontage}"
fail=0
step() { echo; echo "==> $*"; }
warn() { echo "  [!] $*"; fail=1; }

step "System tools"
for t in git node npm python3 ffmpeg ffprobe jq; do
  command -v "$t" >/dev/null 2>&1 && echo "  ok  $t" || warn "missing $t"
done

step "FFmpeg Skill: local speech-to-text engine for captions (faster-whisper)"
if python3 -c "import faster_whisper" 2>/dev/null; then echo "  already installed"
else
  python3 -m pip install --quiet faster-whisper 2>/dev/null \
    || python3 -m pip install --quiet --user faster-whisper 2>/dev/null \
    || python3 -m pip install --quiet --break-system-packages faster-whisper \
    || warn "faster-whisper install failed"
fi

step "Claude Shorts: Python venv at ~/.shorts-skill"
VENV="$HOME/.shorts-skill"
[ -d "$HOME/.video-skill" ] && VENV="$HOME/.video-skill"
[ -x "$VENV/bin/python3" ] || python3 -m venv "$VENV" || warn "venv creation failed"
if "$VENV/bin/python3" -c "import faster_whisper, mediapipe, cv2, numpy" 2>/dev/null; then echo "  already installed"
else
  "$VENV/bin/pip" install --quiet --upgrade pip
  # PyTorch is only used to detect a CUDA GPU; without it transcription runs on CPU.
  if command -v nvidia-smi >/dev/null 2>&1; then
    "$VENV/bin/pip" install --quiet torch --index-url https://download.pytorch.org/whl/cu128 || true
  fi
  "$VENV/bin/pip" install --quiet faster-whisper mediapipe numpy opencv-python || warn "shorts Python deps failed"
fi

step "Claude Shorts: Remotion (npm install)"
(cd "$REPO/.claude/skills/shorts/remotion" && npm install --silent --no-audit --no-fund) || warn "remotion npm install failed"

step "HyperFrames: warm the CLI cache"
npx --yes hyperframes --version || warn "hyperframes CLI not reachable"

step "OpenMontage: project at $OM_DIR"
if [ ! -d "$OM_DIR/.git" ]; then
  git clone --depth 1 https://github.com/calesthio/OpenMontage.git "$OM_DIR" || warn "OpenMontage clone failed"
fi
if [ -d "$OM_DIR" ]; then
  (cd "$OM_DIR" && make setup) || warn "OpenMontage make setup failed"
fi

echo
[ $fail -eq 0 ] && echo "All video skills are ready." || echo "Finished with warnings (see [!] lines above)."
exit $fail
