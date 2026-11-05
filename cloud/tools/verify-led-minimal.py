"""Cycle-level CXXRTL checks of exact LED project sources, including a failing mutation."""
from pathlib import Path
import subprocess,shutil
import yowasp_yosys
r=Path(__file__).resolve().parents[1];out=r/'.sites-runtime/led-minimal';out.mkdir(parents=True,exist_ok=True)
source=(r/'public/fpga/rtl/led_minimal.v').read_text()
fixture='''
module led_fixture(input wire clk,rst_n,en,output wire led1,led3,pin,pin_low);
 led_core #(.HALF_PERIOD(1)) a(.clk(clk),.rst_n(rst_n),.en(en),.led(led1));
 led_core #(.HALF_PERIOD(3)) b(.clk(clk),.rst_n(rst_n),.en(en),.led(led3));
 led_minimal #(.HALF_PERIOD(3)) c(.clk(clk),.rst_n(rst_n),.led_pin(pin));
 led_minimal #(.HALF_PERIOD(3),.LED_ACTIVE_LOW(1)) d(.clk(clk),.rst_n(rst_n),.led_pin(pin_low));
endmodule
'''
exe=shutil.which('yowasp-yosys') or str(Path.home()/'.local/bin/yowasp-yosys');inc=Path(yowasp_yosys.__file__).parent/'share/include/backends/cxxrtl/runtime';shutil.copy(r/'tests/hdl/led-minimal.cpp',out/'check.cpp')
def run(code):
 (out/'led.v').write_text(code+fixture)
 subprocess.run([exe,'-Q','-q','-p',f'read_verilog {out}/led.v; prep -top led_fixture; check -assert; write_cxxrtl {out}/dut.cpp'],check=True)
 subprocess.run(['g++','-std=c++17','-O2','-I'+str(inc),str(out/'check.cpp'),'-o',str(out/'check')],check=True)
 return subprocess.run([str(out/'check')],capture_output=True,text=True)
good=run(source);print(good.stdout,good.stderr);assert good.returncode==0
wrong=source.replace('count==HALF_PERIOD-1','count==HALF_PERIOD');assert wrong!=source
bad=run(wrong);assert bad.returncode!=0,'Mutated terminal comparison unexpectedly passed'
print('PASS rejected off-by-one terminal:',bad.stderr.strip())
