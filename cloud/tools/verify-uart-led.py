"""Integrated cycle-level UART LED simulation using Yosys CXXRTL, not a timing/board claim."""
from pathlib import Path
import subprocess,shutil
import yowasp_yosys
r=Path(__file__).resolve().parents[1];out=r/'.sites-runtime/uart-led';out.mkdir(parents=True,exist_ok=True)
exe=shutil.which('yowasp-yosys')
subprocess.run([exe,'-Q','-q','-p','read_verilog public/fpga/rtl/uart_rx.v public/fpga/rtl/command_led.v public/fpga/rtl/uart_led_top.v; chparam -set BAUD 6250000 uart_led_top; prep -top uart_led_top; check -assert; write_cxxrtl .sites-runtime/uart-led/dut.cpp'],cwd=r,check=True)
cpp=r/'tests/hdl/uart-led.cpp';shutil.copyfile(cpp,out/'check.cpp');include=Path(yowasp_yosys.__file__).parent/'share/include/backends/cxxrtl/runtime'
subprocess.run(['g++','-std=c++17','-O2','-I'+str(include),str(out/'check.cpp'),'-o',str(out/'check')],check=True)
subprocess.run([str(out/'check')],check=True)
