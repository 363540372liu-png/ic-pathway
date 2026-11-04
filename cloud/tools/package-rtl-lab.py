"""Rebuild the learner kit from canonical lesson sources with deterministic ZIP timestamps."""
from pathlib import Path
import json,zipfile
root=Path(__file__).resolve().parents[1];dest=root/'public/rtl-lab'
data=json.loads((root/'public/hdl-content.js').read_text().split('=',1)[1].strip().rstrip(';'))
for l in data:
 if l['id'] in ['memory','fifo-project','uart-project','integration','capstone']:(dest/(l['id']+'.sv')).write_text(l['code']+'\n')
with zipfile.ZipFile(dest/'rtl-projects.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(dest.iterdir()):
  if p.suffix=='.zip':continue
  entry=zipfile.ZipInfo('rtl-projects/'+p.name,(2026,1,1,0,0,0));entry.compress_type=zipfile.ZIP_DEFLATED;z.writestr(entry,p.read_bytes())
print('Packaged canonical RTL, TB and project instructions')
