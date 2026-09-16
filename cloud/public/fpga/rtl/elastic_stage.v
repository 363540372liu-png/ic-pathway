`timescale 1ns/1ps
// One-entry buffer. Data remains stable while out_valid && !out_ready.
module elastic_stage(input wire clk,rst_n,input wire [7:0] in_data,
 input wire in_valid,output wire in_ready,output reg [7:0] out_data,
 output reg out_valid,input wire out_ready);
 assign in_ready=!out_valid||out_ready;
 always @(posedge clk) begin
  if(!rst_n) begin out_valid<=0;out_data<=0;end
  else if(in_ready) begin out_valid<=in_valid;if(in_valid)out_data<=in_data;end
 end
endmodule
