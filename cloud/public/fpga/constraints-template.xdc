# Template only: deliberately refuses execution until you supply real board data.
# Use the manufacturer's schematic/master XDC for exact package pins and voltages.
error "Replace this guarded template with your verified board-specific XDC."
# create_clock -name board_clk -period <1000 / actual_MHz> [get_ports clk]
# set_property PACKAGE_PIN <verified_clock_pin> [get_ports clk]
# set_property IOSTANDARD <bank_voltage_standard> [get_ports clk]
# set_property PACKAGE_PIN <verified_LED_pin> [get_ports led]
# set_property IOSTANDARD <bank_voltage_standard> [get_ports led]
# Constraints on external signals require interface-specific timing intent.
# Do NOT silence UCIO-1/NSTD-1 DRC errors to generate a bitstream.
