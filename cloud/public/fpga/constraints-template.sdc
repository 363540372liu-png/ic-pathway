# Universal intent: constrain the REAL board clock; tool support must be checked.
error "Fill in verified clock and target-tool interface settings before use."
# create_clock -name system_clock -period <1000/actual_MHz> [get_ports clk]
# Efinity pin/voltage/peripheral setup belongs in the target device interface flow.
# Do not paste AMD PACKAGE_PIN / IOSTANDARD XDC commands into Efinity.
# Add I/O timing budgets from the agreed external interface, not guessed values.
