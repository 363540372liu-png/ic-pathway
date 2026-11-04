"""Open-source synthesis-backed functional regression, not STA or VCS simulation.
Requires pyslang (separate elaboration script), yowasp-yosys, g++.
Builds exact canonical lesson modules, runs boundary stimuli, then injects +2 bug.
"""
from pathlib import Path
import json,subprocess,sys,shutil
import yowasp_yosys
root=Path(__file__).resolve().parents[1];out=root/'.sites-runtime/textbook';out.mkdir(parents=True,exist_ok=True)
data=json.loads((root/'public/hdl-content.js').read_text().split('=',1)[1].strip().rstrip(';'))
ids=['branches','edges','nba','counter','sv-always','fsm']
rtl='\n'.join(next(l['code'] for l in data if l['id']==id) for id in ids)+'\n'+(root/'tests/hdl/textbook_fixture.sv').read_text()
src=out/'textbook.sv';src.write_text(rtl)
yosys=shutil.which('yowasp-yosys') or str(Path.home()/'.local/bin/yowasp-yosys')
inc=Path(yowasp_yosys.__file__).parent/'share/include/backends/cxxrtl/runtime'
shutil.copy(root/'tests/hdl/textbook_check.cpp',out/'check.cpp')
def run():
 subprocess.run([yosys,'-Q','-q','-p',f'read_verilog -sv {src}; prep -top textbook_fixture; check -assert; write_cxxrtl {out}/textbook.cpp'],check=True)
 subprocess.run(['g++','-std=c++17','-O2','-I'+str(inc),str(out/'check.cpp'),'-o',str(out/'check')],check=True)
 return subprocess.run([str(out/'check')],capture_output=True,text=True)
result=run();print(result.stdout,result.stderr)
if result.returncode:raise SystemExit(result.returncode)
src.write_text(rtl.replace("q <= q + 4'd1","q <= q + 4'd2"))
if src.read_text()==rtl:raise SystemExit('Mutation did not change canonical counter')
bad=run()
if bad.returncode==0:raise SystemExit('Mutated counter falsely passed')
print('PASS: deliberately incorrect +2 counter is rejected:',bad.stderr.strip())
src.write_text(rtl)
