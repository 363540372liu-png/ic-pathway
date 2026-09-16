`timescale 1ns/1ps
// ASCII '0' = off, '1' = on. All other commands hold the old value.
module command_led(input wire clk,rst_n,valid,input wire [7:0] data,output reg led);
 always @(posedge clk) begin
  if(!rst_n) led<=0;
  else if(valid) begin
   case(data)
    8'h30: led<=0;
    8'h31: led<=1;
    default: led<=led;
   endcase
  end
 end
endmodule
