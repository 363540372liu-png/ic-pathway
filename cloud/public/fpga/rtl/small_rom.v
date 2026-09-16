`timescale 1ns/1ps
// A tiny asynchronous ROM often maps to LUTs, not BRAM.
module small_rom(input wire [1:0] address,output reg [7:0] data);
 always @(*) begin
  case(address)
   0:data=8'h11;1:data=8'h22;2:data=8'h44;default:data=8'h88;
  endcase
 end
endmodule
