#!/bin/sh
set -eu
cd "$(dirname "$0")"
mkdir -p work
iverilog -g2012 -s tb_uart_led -o work/sim rtl/uart_rx.v rtl/command_led.v rtl/uart_led_top.v tb/tb_uart_led.sv
vvp work/sim
