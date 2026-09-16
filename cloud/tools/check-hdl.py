"""Optional development check: pip install pyslang yowasp-yosys; requires g++.
No commercial tool or FPGA board is implied by this regression.
Run from repository root with python tools/check-hdl.py.
"""
from pathlib import Path
import shutil,subprocess,sys
from pyslang.syntax import SyntaxTree
from pyslang.ast import Compilation
import yowasp_yosys
out=Path('.sites-runtime/hdl');out.mkdir(parents=True,exist_ok=True)
comp=Compilation()
for path in [*Path('public/fpga/rtl').glob('*.v'),*Path('public/fpga/tb').glob('*.sv')]:comp.addSyntaxTree(SyntaxTree.fromFile(str(path)))
comp.getRoot()
errors=[str(d.code) for d in comp.getAllDiagnostics() if d.isError()]
if errors:raise SystemExit('HDL elaboration errors: '+str(errors))
print('PASS: all RTL and testbenches elaborate; integer-parameter comparison warnings are nonfatal')
exe=shutil.which('yowasp-yosys')
if not exe:raise SystemExit('Install yowasp-yosys and put its console command on PATH')
subprocess.run([exe,'-Q','-q','-p','read_verilog public/fpga/rtl/*.v tests/hdl/fixture.v; prep -top fixture; check -assert; write_cxxrtl .sites-runtime/hdl/fixture.cpp'],check=True)
shutil.copyfile('tests/hdl/check.cpp',out/'check.cpp')
include=Path(yowasp_yosys.__file__).parent/'share/include/backends/cxxrtl/runtime'
subprocess.run(['g++','-std=c++17','-O2','-I'+str(include),str(out/'check.cpp'),'-o',str(out/'check')],check=True)
subprocess.run([str(out/'check')],check=True)
