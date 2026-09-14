module counter #(parameter WIDTH = 8) (
  input wire clk,
  input wire rst_n,
  input wire en,
  output reg [WIDTH-1:0] count
);
  always @(posedge clk) begin
    if (!rst_n)
      count <= {WIDTH{1'b0}};
    else if (en)
      count <= count + 1'b1;
  end
endmodule
