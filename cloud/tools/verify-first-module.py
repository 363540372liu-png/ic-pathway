"""Check the exact lesson-7 two-instance circuit, and reject a miswired instance."""
from pathlib import Path
import subprocess,shutil,json
import yowasp_yosys
r=Path(__file__).resolve().parents[1];out=r/'.sites-runtime/first-module';out.mkdir(parents=True,exist_ok=True)
L=json.loads((r/'public/hdl-content.js').read_text().split('=',1)[1].strip().rstrip(';'));code=next(l['code'] for l in L if l['id']=='module')
(out/'check.cpp').write_text('''#include "dut.cpp"
#include <iostream>
int main(){cxxrtl_design::p_top d;for(unsigned n=0;n<8;n++){unsigned x=(n>>2)&1,z=(n>>1)&1,en=n&1;d.p_x.set(x);d.p_z.set(z);d.p_enable.set(en);d.step();if(d.p_result.get<unsigned>()!=(x&z&en)){std::cerr<<"wiring mismatch input "<<n;return 1;}}std::cout<<"PASS lesson-7 eight input combinations\\n";}
''')
exe=shutil.which('yowasp-yosys') or str(Path.home()/'.local/bin/yowasp-yosys');inc=Path(yowasp_yosys.__file__).parent/'share/include/backends/cxxrtl/runtime'
def run(src):
 (out/'top.v').write_text(src)
 subprocess.run([exe,'-Q','-q','-p',f'read_verilog {out}/top.v; prep -top top; check -assert; write_cxxrtl {out}/dut.cpp'],check=True)
 subprocess.run(['g++','-std=c++17','-O2','-I'+str(inc),str(out/'check.cpp'),'-o',str(out/'check')],check=True)
 return subprocess.run([str(out/'check')],capture_output=True,text=True)
good=run(code);print(good.stdout,good.stderr);assert good.returncode==0
badcode=code.replace('.b(enable)','.b(pair)');assert badcode!=code
bad=run(badcode);assert bad.returncode!=0;print('PASS rejected wrong second input:',bad.stderr)
