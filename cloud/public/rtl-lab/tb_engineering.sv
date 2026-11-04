`timescale 1ns/1ps
module tb_engineering;
 reg clk=0,rst_n=0,push=0,pop=0,we=0,start=0,sv=0,mr=0;
 reg [7:0] data=0;reg [3:0] addr=0;
 wire [7:0] front,ram_q,rv_data;wire full,empty,tx,busy,sr,mv;
 fifo4 f(clk,rst_n,push,pop,data,front,full,empty);
 ram16 m(clk,we,addr,data,ram_q);
 uart_tx #(.CLKS_PER_BIT(4)) u(clk,rst_n,start,data,tx,busy);
 rv_register v(clk,rst_n,sv,mr,data,sr,mv,rv_data);
 task automatic cycle;
  begin #4;clk=1;#1;clk=0;#5;end
 endtask
 task automatic expect_flags(input bit ef,input bit ee);
  if(full!==ef||empty!==ee)$fatal(1,"FIFO flags full=%b empty=%b",full,empty);
 endtask
 integer i,j,k;reg [9:0] expected;
 initial begin
  cycle();rst_n=1;
  // RAM read-first. First read of uninitialized location deliberately not checked.
  addr=2;data=8'h5a;we=1;cycle();
  data=8'ha5;cycle();if(ram_q!==8'h5a)$fatal(1,"RAM read-first");
  we=0;cycle();if(ram_q!==8'ha5)$fatal(1,"RAM written value");
  // FIFO: fill, reject overflow, simultaneous request at full accepts read only.
  push=1;for(i=0;i<4;i=i+1)begin data=i;cycle();end
  expect_flags(1,0);data=99;cycle();expect_flags(1,0);
  if(front!==0)$fatal(1,"FIFO first word");pop=1;cycle();expect_flags(0,0);
  push=0;
  for(i=1;i<4;i=i+1)begin if(front!==i[7:0])$fatal(1,"FIFO order");cycle();end
  expect_flags(0,1);cycle();expect_flags(0,1);pop=0;
  // Wrap around repeatedly with paired write/read; empty read requests do not underflow.
  for(i=0;i<20;i=i+1)begin push=1;data=i+10;cycle();push=0;pop=1;
   if(front!==(i+10))$fatal(1,"FIFO wrap");cycle();pop=0;end
  // Elastic register holds data while stalled, then replaces on a simultaneous transfer.
  sv=1;data=8'h3c;cycle();sv=0;data=8'h99;
  repeat(3)begin cycle();if(!mv||rv_data!==8'h3c)$fatal(1,"RV stall");end
  sv=1;mr=1;data=8'h5a;cycle();if(!mv||rv_data!==8'h5a)$fatal(1,"RV replacement");
  sv=0;cycle();if(mv)$fatal(1,"RV drain");mr=0;
  // UART all 256 payloads. Check each bit every clock, not just final byte.
  for(i=0;i<256;i=i+1)begin
   data=i;start=1;cycle();start=0;expected={1'b1,i[7:0],1'b0};
   for(j=0;j<10;j=j+1)begin
    for(k=0;k<4;k=k+1)begin
     if(tx!==expected[j]||!busy)$fatal(1,"UART byte=%d bit=%d tick=%d",i,j,k);
     cycle();
    end
   end
   if(busy||tx!==1)$fatal(1,"UART stop duration");
  end
  // Reset cancels pending transactions and restores idle outputs.
  start=1;data=8'hff;cycle();start=0;rst_n=0;cycle();
  if(busy||tx!==1||mv||!empty)$fatal(1,"reset");
  $display("PASS engineering self-check: RAM/FIFO/ready-valid/UART256");$finish;
 end
 initial begin #200000;$fatal(1,"timeout");end
endmodule
