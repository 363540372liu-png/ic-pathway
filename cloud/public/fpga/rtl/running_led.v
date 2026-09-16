`timescale 1ns/1ps
module running_led(input wire clk,rst_n,tick,en,output reg [3:0] led);
 always @(posedge clk) begin
  if(!rst_n) led<=4'b0001;
  else if(tick && en) led<={led[2:0],led[3]};
 end
endmodule
