`timescale 1ns/1ps
// Unsigned Q8 coefficient: gain=384 means 1.5. Round to nearest then saturate.
module fixed_scale(input wire [7:0] sample,input wire [8:0] gain,output wire [7:0] result);
 wire [16:0] product=sample*gain;
 wire [17:0] rounded={1'b0,product}+18'd128;
 wire [9:0] scaled=rounded[17:8];
 assign result=(scaled>10'd255)?8'd255:scaled[7:0];
endmodule
