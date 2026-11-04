"""Compile canonical project RTL to CXXRTL and test functionality; not an event simulator/STA."""
from pathlib import Path
import json,subprocess,sys,shutil
import yowasp_yosys
root=Path(__file__).resolve().parents[1];out=root/'.sites-runtime/engineering';out.mkdir(parents=True,exist_ok=True)
data=json.loads((root/'public/hdl-content.js').read_text().split('=',1)[1].strip().rstrip(';'))
rtl='\n'.join(next(l['code'] for l in data if l['id']==id) for id in ['memory','fifo-project','uart-project','integration'])+'\n'+(root/'tests/hdl/engineering_fixture.sv').read_text()
src=out/'engineering.sv';src.write_text(rtl)
yosys=shutil.which('yowasp-yosys') or str(Path.home()/'.local/bin/yowasp-yosys')
inc=Path(yowasp_yosys.__file__).parent/'share/include/backends/cxxrtl/runtime'
shutil.copy(root/'tests/hdl/engineering_check.cpp',out/'check.cpp')
def run():
 subprocess.run([yosys,'-Q','-q','-p',f'read_verilog -sv {src}; prep -top engineering_fixture; check -assert; write_cxxrtl {out}/engineering.cpp'],check=True)
 subprocess.run(['g++','-std=c++17','-O2','-I'+str(inc),str(out/'check.cpp'),'-o',str(out/'check')],check=True)
 return subprocess.run([str(out/'check')],capture_output=True,text=True)
good=run();print(good.stdout,good.stderr)
if good.returncode:raise SystemExit(good.returncode)
for before,after,name in [("wire wr=push && !full",'wire wr=push','FIFO full protection'),('frame[bitno+1]','frame[bitno]','UART bit order')]:
 mutated=rtl.replace(before,after)
 if mutated==rtl:raise SystemExit('Mutation missing '+name)
 src.write_text(mutated);bad=run()
 if not bad.returncode:raise SystemExit('Mutation falsely passed '+name)
 print('PASS rejected',name,bad.stderr.strip())
src.write_text(rtl)
