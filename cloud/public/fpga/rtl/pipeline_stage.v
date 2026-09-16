`timescale 1ns/1ps
// No backpressure. Every rising edge shifts valid, including invalid bubbles.
module pipeline_stage(input wire clk,rst_n,input wire [7:0] data_in,
 input wire valid_in,output reg [7:0] data_out,output reg valid_out);
 always @(posedge clk) begin
  if(!rst_n) begin data_out<=0;valid_out<=0;end
  else begin valid_out<=valid_in;if(valid_in)data_out<=data_in;end
 end
endmodule
