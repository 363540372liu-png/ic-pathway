`timescale 1ns/1ps
// HALF_PERIOD >= 1. Only clk is a clock; en is a synchronous clock enable.
module led_core #(parameter integer HALF_PERIOD=25000000)(
 input wire clk,rst_n,en,output reg led);
 localparam integer W=(HALF_PERIOD<=1)?1:$clog2(HALF_PERIOD);
 reg [W-1:0] count;
 always @(posedge clk) begin
  if(!rst_n) begin count<=0; led<=0; end
  else if(en) begin
   if(count==HALF_PERIOD-1) begin count<=0; led<=~led; end
   else count<=count+1'b1;
  end
 end
endmodule
module led_minimal #(parameter integer HALF_PERIOD=25000000,
 parameter LED_ACTIVE_LOW=0)(input wire clk,rst_n,output wire led_pin);
 (* ASYNC_REG="TRUE" *) reg [1:0] reset_pipe;
 always @(posedge clk or negedge rst_n) begin
  if(!rst_n) reset_pipe<=2'b00;
  else reset_pipe<={reset_pipe[0],1'b1};
 end
 wire led;
 led_core #(.HALF_PERIOD(HALF_PERIOD)) u_core(
  .clk(clk),.rst_n(reset_pipe[1]),.en(1'b1),.led(led));
 assign led_pin=LED_ACTIVE_LOW?~led:led;
endmodule
