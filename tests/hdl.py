"""Run actual HDL simulations and verify that known defects are rejected."""
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def run_case(name, rtl, testbench, should_pass):
    with tempfile.TemporaryDirectory(prefix='ic-pathway-hdl-') as directory:
        work = Path(directory)
        (work / 'counter.v').write_text(rtl)
        (work / 'tb_counter.sv').write_text(testbench)
        compiled = subprocess.run(
            ['iverilog', '-g2012', '-s', 'tb_counter', '-o', 'simulation',
             'counter.v', 'tb_counter.sv'], cwd=work, capture_output=True,
            text=True, timeout=30)
        if compiled.returncode:
            raise RuntimeError(f'{name}: compilation failed\n{compiled.stdout}{compiled.stderr}')
        result = subprocess.run(['vvp', 'simulation'], cwd=work,
                                capture_output=True, text=True, timeout=30)
        output = result.stdout + result.stderr
        passed = result.returncode == 0 and 'PASS: counter ' in output
        if should_pass and not passed:
            raise AssertionError(f'{name}: expected a passing run\n{output}')
        if not should_pass and (passed or 'FAIL' not in output):
            raise AssertionError(f'{name}: checker did not reject the defect\n{output}')
        print(f'{name}: {"passed" if should_pass else "defect rejected"}')


def main():
    missing = [tool for tool in ('iverilog', 'vvp') if not shutil.which(tool)]
    if missing:
        raise SystemExit('HDL checks NOT RUN; missing tools: ' + ', '.join(missing))
    rtl = (ROOT / 'lab/rtl/counter.v').read_text()
    tb = (ROOT / 'lab/tb/tb_counter.sv').read_text()
    for width in (1, 4, 8):
        variant, count = re.subn(r'localparam WIDTH = 4;',
                                f'localparam WIDTH = {width};', tb)
        assert count == 1
        run_case(f'WIDTH={width}', rtl, variant, True)
    assert "count + 1'b1" in rtl
    run_case('wrong increment', rtl.replace("count + 1'b1", "count + 2'b10"), tb, False)
    assert 'always @(posedge clk)' in rtl
    run_case('wrong asynchronous reset',
             rtl.replace('always @(posedge clk)',
                         'always @(posedge clk or negedge rst_n)'), tb, False)
    print('Actual Icarus checks completed: three parameter cases and two rejected defects.')


if __name__ == '__main__':
    main()
