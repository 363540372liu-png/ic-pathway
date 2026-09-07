#!/usr/bin/env bash
set -euo pipefail
lab_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
command -v vcs >/dev/null
mkdir -p "$lab_root/work/vcs"
cd "$lab_root/work/vcs"
vcs -full64 -sverilog -top tb_counter \
  -f ../../filelist.f -o simv -l compile.log
./simv -l sim.log
if ! grep -q '^PASS: counter ' sim.log; then
  printf '%s\n' 'No PASS marker found; inspect sim.log.' >&2
  exit 1
fi
printf '%s\n' "Waveform: $lab_root/work/vcs/counter.vcd"
