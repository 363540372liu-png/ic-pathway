`timescale 1ns/1ps
module led_toggle(input wire clk,rst_n,press_pulse,output reg led);
 always @(posedge clk) begin
  if(!rst_n) led<=1'b0;
  else if(press_pulse) led<=~led;
 end
endmodule
