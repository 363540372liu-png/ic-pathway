`timescale 1ns/1ps
// Teaching 16x8 synchronous RAM. Uninitialized contents; qualify reads externally.
// Read-first RTL semantics; verify target primitive mapping and collision behavior.
module sync_ram(input wire clk,we,input wire [3:0] addr,
 input wire [7:0] din,output reg [7:0] dout);
 reg [7:0] mem[0:15];
 always @(posedge clk) begin
  dout<=mem[addr];
  if(we)mem[addr]<=din;
 end
endmodule
