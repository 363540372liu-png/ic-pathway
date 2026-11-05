"""Reproducible self-contained project kit, without board-specific pin assumptions."""
from pathlib import Path
import json,zipfile
r=Path(__file__).resolve().parents[1];p=r/'public/fpga'
files={str(f.relative_to(p/'workflow')):f.read_bytes() for f in (p/'workflow').rglob('*') if f.is_file()}
for name in ['rtl/uart_rx.v','rtl/command_led.v','rtl/uart_led_top.v','tb/tb_uart_led.sv']:files[name]=(p/name).read_bytes()
with zipfile.ZipFile(p/'uart-led-workflow.zip','w',zipfile.ZIP_DEFLATED) as z:
 for name,data in sorted(files.items()):
  info=zipfile.ZipInfo('uart-led-workflow/'+name,(2026,11,5,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data)
print('Packaged UART LED project:',len(files),'files')
files={'README.md':(p/'led-workflow/README.md').read_bytes(), 'rtl/led_minimal.v':(p/'rtl/led_minimal.v').read_bytes(),'tb/tb_led_minimal.sv':(p/'tb/tb_led_minimal.sv').read_bytes()}
with zipfile.ZipFile(p/'led-minimal-workflow.zip','w',zipfile.ZIP_DEFLATED) as z:
 for name,data in sorted(files.items()):
  info=zipfile.ZipInfo('led-minimal-workflow/'+name,(2026,11,5,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data)
print('Packaged minimal LED project:',len(files),'files')
