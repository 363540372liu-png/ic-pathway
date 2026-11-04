module ram16(input logic clk,we,input logic [3:0] addr,
 input logic [7:0] wdata,output logic [7:0] rdata);
 logic [7:0] mem[0:15];
 always_ff @(posedge clk) begin
  if(we) mem[addr]<=wdata;
  rdata<=mem[addr];
 end
endmodule
