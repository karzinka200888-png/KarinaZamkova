# Inserts the video block into index.html (run in the audit folder). Keeps a backup.
import shutil, sys
p = 'index.html'
s = open(p, encoding='utf-8').read()
if '<video' in s:
    sys.exit('already has video, nothing changed')
shutil.copy2(p, 'index-backup-2026-10-26.html')
css = """
  /* ---------- video ---------- */
  .video-section{ padding:24px 0 84px; }
  .video-frame{ position:relative; max-width:920px; margin:0 auto; border-radius:20px; overflow:hidden; border:1px solid var(--line); background:#F3F7F7; box-shadow:0 18px 50px rgba(27,32,31,.08); aspect-ratio:16/9; }
  .video-frame video{ width:100%; height:100%; display:block; object-fit:contain; background:#F3F7F7; }
  .video-cta{ display:flex; flex-wrap:wrap; gap:12px 20px; align-items:center; justify-content:center; margin-top:28px; text-align:center; }

"""
sec = """<section class="video-section" id="video">
  <div class="wrap">
    <div class="section-head reveal">
      <div class="eyebrow"><span class="dash"></span>Коротко про аудит</div>
      <h2>За 4 хвилини: що бачить податкова і як проходить аудит</h2>
    </div>
    <div class="video-frame reveal">
      <video controls playsinline preload="metadata" poster="audit-video-poster.jpg">
        <source src="audit-video.mp4" type="video/mp4">
      </video>
    </div>
    <div class="video-cta reveal">
      <a href="https://tally.so/r/1WAkGb" target="_blank" rel="noopener" class="btn">Заповнити анкету</a>
      <span class="note">5–7 хвилин. Без оплати та зобов'язань.</span>
    </div>
  </div>
</section>

"""
m = '  /* ---------- section shell ---------- */'
k = '<section id="komu"'
assert s.count(m) == 1 and s.count(k) == 1, 'markers not found'
s = s.replace(m, css + m).replace(k, sec + k)
open(p, 'w', encoding='utf-8').write(s)
print('OK', len(s.encode('utf-8')), 'bytes')
