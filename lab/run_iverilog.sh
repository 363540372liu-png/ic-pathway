#!/usr/bin/env bash
set -euo pipefail
lab_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
command -v iverilog >/dev/null
command -v vvp >/dev/null
mkdir -p "$lab_root/work/iverilog"
cd "$lab_root/work/iverilog"
iverilog -g2012 -s tb_counter -o simv_iverilog \
  ../../rtl/counter.v ../../tb/tb_counter.sv 2>&1 | tee compile.log
vvp simv_iverilog 2>&1 | tee sim.log
if ! grep -q '^PASS: counter ' sim.log; then
  printf '%s\n' 'No PASS marker found; inspect sim.log.' >&2
  exit 1
fi
printf '%s\n' "Waveform: $lab_root/work/iverilog/counter.vcd"
