# Basic educational DC flow. Run from work/dc via run_dc.sh.
# Library and commands must be checked against the school's licensed installation.
if {![info exists env(STDCELL_DB)] || ![file exists $env(STDCELL_DB)]} {
  error "Set STDCELL_DB to an existing authorized .db library"
}
if {![info exists env(DC_UNITS_CONFIRMED)] || $env(DC_UNITS_CONFIRMED) ne "1"} {
  error "Confirm library units and the teaching constraints first; see README"
}
file mkdir reports
file mkdir netlist
file mkdir WORK
define_design_lib WORK -path ./WORK
set_app_var target_library [list $env(STDCELL_DB)]
set_app_var link_library [concat [list *] $target_library]
analyze -format verilog ../../rtl/counter.v
elaborate counter
current_design counter
link
report_units > reports/units.rpt
check_design > reports/check_design.rpt
source ../../dc/constraints.sdc
check_timing > reports/check_timing_before.rpt
compile
check_design > reports/check_design_after.rpt
check_timing > reports/check_timing_after.rpt
report_area > reports/area.rpt
report_timing -delay_type max -max_paths 5 > reports/setup.rpt
report_timing -delay_type min -max_paths 5 > reports/hold.rpt
report_constraint -all_violators > reports/violations.rpt
report_qor > reports/qor.rpt
change_names -rules verilog -hierarchy
write -format verilog -hierarchy -output netlist/counter_mapped.v
write -format ddc -hierarchy -output netlist/counter.ddc
write_sdc netlist/counter.sdc
exit
