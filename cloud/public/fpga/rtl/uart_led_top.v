`timescale 1ns/1ps
// Portable core, not a pinout. Set CLOCK_HZ from the actual board oscillator.
// Integer divider receiver requires CLOCK_HZ / BAUD >= 8.
module uart_led_top #(parameter integer CLOCK_HZ=50000000,
 parameter integer BAUD=115200,parameter LED_ACTIVE_LOW=0)(
 input wire clk,reset_button_n,uart_rx_pin,output wire led_pin);
 localparam integer CLKS_PER_BIT=CLOCK_HZ/BAUD;
 (* ASYNC_REG="TRUE" *) reg [1:0] reset_pipe;
 always @(posedge clk or negedge reset_button_n) begin
  if(!reset_button_n) reset_pipe<=2'b00;
  else reset_pipe<={reset_pipe[0],1'b1};
 end
 wire rst_n=reset_pipe[1];
 wire [7:0] rx_data;
 wire rx_valid,rx_error,led_state;
 uart_rx #(.CLKS_PER_BIT(CLKS_PER_BIT)) receiver(
  .clk(clk),.rst_n(rst_n),.rx(uart_rx_pin),.data(rx_data),
  .valid(rx_valid),.frame_error(rx_error));
 command_led decoder(.clk(clk),.rst_n(rst_n),.valid(rx_valid),.data(rx_data),.led(led_state));
 assign led_pin=LED_ACTIVE_LOW ? ~led_state : led_state;
endmodule
