---
name: openmontage
description: >
  OpenMontage — full video production studio (github.com/calesthio/OpenMontage).
  Use when the user wants to recreate the style of someone else's viral reel/short on
  their own topic, analyse why a video went viral (hook, rhythm, editing), or produce a
  video with one of its pipelines: talking head, clip factory, podcast repurpose,
  localization/dubbing, animated explainer, documentary montage, screen demo, cinematic,
  avatar spokesperson. Triggers: "повтори этот рилс", "сделай в том же стиле",
  "разбери, почему залетело", "OpenMontage", "make a video like this one".
---

# OpenMontage

OpenMontage is a separate project, installed at `$HOME/OpenMontage` by
`scripts/setup-video-skills.sh` in this repository.

## Before anything else

1. Make sure it is installed:
   ```bash
   OM="${OPENMONTAGE_DIR:-$HOME/OpenMontage}"
   [ -x "$OM/.venv/bin/python" ] || bash "${CLAUDE_PROJECT_DIR:-$(pwd)}/scripts/setup-video-skills.sh"
   ```
2. Read `$OM/AGENT_GUIDE.md` in full and follow its routing rules — it decides the first
   action for the user's request. Its own skills live in `$OM/skills/` (start with
   `$OM/skills/INDEX.md`) and `$OM/.claude/skills/`; read the ones the guide points to.
3. Run every OpenMontage command from inside `$OM` with its virtualenv
   (`cd "$OM" && .venv/bin/python ...`), as the guide describes.

## Notes

- No API keys are needed for analysis, editing, captions, offline TTS (Piper) and
  HyperFrames/Remotion rendering. Keys (in `$OM/.env`) are only for AI image/video/voice
  generation — ask the user before using a paid provider and never invent a key.
- Put the user's finished videos in the repository's `output/` folder (create it) so they
  can find them, unless they ask for another place.
