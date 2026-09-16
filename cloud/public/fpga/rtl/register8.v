`timescale 1ns/1ps
module register8(input wire clk,rst_n,en,input wire [7:0] d,output reg [7:0] q);
 always @(posedge clk) begin
  if(!rst_n) q<=8'd0;
  else if(en) q<=d;
 end
endmodule
