#include "dut.cpp"
#include <cassert>
#include <iostream>
using cxxrtl_design::p_uart__led__top;
p_uart__led__top d;
int checks=0;
void cycle(){d.p_clk.set(0u);d.step();d.p_clk.set(1u);d.step();d.step();}
void wait(int n){for(int i=0;i<n;i++)cycle();}
void bit(unsigned b){d.p_uart__rx__pin.set(b);wait(8);}
void serial(unsigned b,bool stop=true){bit(0);for(int i=0;i<8;i++)bit((b>>i)&1);bit(stop);bit(1);}
void expect(unsigned n){assert(d.p_led__pin.get<unsigned>()==n);checks++;}
void reset(){d.p_uart__rx__pin.set(1u);d.p_reset__button__n.set(0u);wait(4);d.p_reset__button__n.set(1u);wait(4);expect(0);}
int main(){reset();serial(0x31);expect(1);serial(0x55);expect(1);serial(0x30,false);expect(1);serial(0x30);expect(0);
 for(unsigned x=0;x<256;x++){reset();serial(x);expect(x==0x31);}
 serial(0x31);expect(1);reset();expect(0);std::cout<<"PASS integrated UART LED: "<<checks<<" checks; all 256 bytes, bad stop, hold and reset\n";}
