# TEACHING ASSUMPTIONS, not physical signoff constraints.
# Confirm time units in report_units (example below assumes ns).
# Confirm capacitance units before using set_load 0.01.
# Default counter WIDTH=8; rst_n is synchronous and is constrained as data.
create_clock -name core_clk -period 10 [get_ports clk]
set_clock_uncertainty 0.1 [get_clocks core_clk]
set_input_delay -max 1.0 -clock core_clk [get_ports {en rst_n}]
set_input_delay -min 0.2 -clock core_clk [get_ports {en rst_n}]
set_output_delay -max 1.0 -clock core_clk [all_outputs]
set_output_delay -min 0.2 -clock core_clk [all_outputs]
set_input_transition 0.1 [get_ports {en rst_n}]
set_clock_transition 0.1 [get_clocks core_clk]
set_load 0.01 [all_outputs]
