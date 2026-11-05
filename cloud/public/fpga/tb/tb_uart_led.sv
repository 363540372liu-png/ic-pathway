`timescale 1ns/1ps
module tb_uart_led;
 reg clk=0,reset_button_n=0,uart_rx_pin=1;wire led_pin;
 // Accelerated, internally consistent simulation: 50 MHz / 6.25 Mbaud = 8 clocks/bit.
 // A board normally uses 115200 baud and a divider based on its actual clock.
 uart_led_top #(.CLOCK_HZ(50000000),.BAUD(6250000)) dut(.*);
 always #10 clk=~clk;
 task automatic bit_time(input bit level);
  begin @(negedge clk);uart_rx_pin=level;repeat(8)@(posedge clk);end
 endtask
 task automatic send_byte(input [7:0] value,input bit stop_ok);
  integer b;begin bit_time(0);for(b=0;b<8;b=b+1)bit_time(value[b]);bit_time(stop_ok);
   @(negedge clk);uart_rx_pin=1;repeat(8)@(posedge clk);end
 endtask
 task automatic check_led(input bit expected);
  begin @(negedge clk);if(led_pin!==expected)$fatal(1,"LED expected %b got %b",expected,led_pin);end
 endtask
 initial begin
  repeat(3)@(negedge clk);reset_button_n=1;repeat(4)@(negedge clk);check_led(0);
  send_byte(8'h31,1);check_led(1);
  send_byte(8'h55,1);check_led(1);
  send_byte(8'h30,0);check_led(1); // invalid stop must not decode off
  send_byte(8'h30,1);check_led(0);
  send_byte(8'h31,1);check_led(1);
  reset_button_n=0;repeat(4)@(negedge clk);check_led(0);
  $display("PASS UART LED: commands, illegal byte, stop error, reset");$finish;
 end
 initial begin #1000000;$fatal(1,"timeout");end
endmodule
