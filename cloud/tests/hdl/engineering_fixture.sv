module engineering_fixture(input wire clk,rst_n,push,pop,we,start,sv,mr,
 input wire [7:0] data,input wire [3:0] addr,
 output wire [7:0] front,ram_q,rv_data,
 output wire full,empty,tx,busy,sr,mv);
 fifo4 f(.clk(clk),.rst_n(rst_n),.push(push),.pop(pop),.din(data),.dout(front),.full(full),.empty(empty));
 ram16 m(.clk(clk),.we(we),.addr(addr),.wdata(data),.rdata(ram_q));
 uart_tx #(.CLKS_PER_BIT(4)) u(.clk(clk),.rst_n(rst_n),.start(start),.data(data),.tx(tx),.busy(busy));
 rv_register v(.clk(clk),.rst_n(rst_n),.s_valid(sv),.m_ready(mr),.s_data(data),.s_ready(sr),.m_valid(mv),.m_data(rv_data));
endmodule
