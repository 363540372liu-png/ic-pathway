#!/usr/bin/env bash
set -euo pipefail
lab_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
command -v dc_shell >/dev/null
: "${STDCELL_DB:?Set STDCELL_DB to the absolute path of your authorized .db library.}"
if [[ "$STDCELL_DB" != /* ]] || [[ ! -f "$STDCELL_DB" ]]; then
  printf '%s\n' 'STDCELL_DB must be an existing absolute file path.' >&2
  exit 1
fi
if [[ "${DC_UNITS_CONFIRMED:-}" != "1" ]]; then
  printf '%s\n' 'Read README and confirm the library units and every teaching constraint first.' >&2
  printf '%s\n' 'Then set DC_UNITS_CONFIRMED=1 for this learning run.' >&2
  exit 1
fi
mkdir -p "$lab_root/work/dc"
cd "$lab_root/work/dc"
touch run_started.marker
dc_shell -f ../../dc/run.tcl 2>&1 | tee dc.log
if [[ ! -s netlist/counter_mapped.v ]] || [[ ! -s reports/area.rpt ]] || [[ ! netlist/counter_mapped.v -nt run_started.marker ]] || [[ ! reports/area.rpt -nt run_started.marker ]]; then
  printf '%s\n' 'Expected fresh output files are missing; inspect dc.log.' >&2
  exit 1
fi
printf '%s\n' 'Outputs generated. Inspect all check, timing, and constraint reports; this is not a timing PASS.'
