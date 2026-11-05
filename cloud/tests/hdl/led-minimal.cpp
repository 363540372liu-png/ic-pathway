#include "dut.cpp"
#include <iostream>
using cxxrtl_design::p_led__fixture;
int main(){p_led__fixture d;unsigned phase=0,l3=0,l1=0,topPhase=0,topLed=0,pipe=0;unsigned checks=0;
 for(unsigned i=0;i<200;i++){
  bool reset=(i==0||i==37||i==120),en=(i%7!=2&&i%7!=3);
  d.p_clk.set(0u);d.p_rst__n.set(unsigned(!reset));d.p_en.set(unsigned(en));d.step();
  if(reset){phase=0;l3=0;l1=0;pipe=0;}
  else if(en){l1^=1;if(++phase==3){phase=0;l3^=1;}}
  if(!(pipe&2)){topPhase=0;topLed=0;}else if(++topPhase==3){topPhase=0;topLed^=1;}
  pipe=reset?0:((pipe<<1)|1)&3;
  d.p_clk.set(1u);d.step();d.step();
  if(d.p_led3.get<unsigned>()!=l3||d.p_led1.get<unsigned>()!=l1||d.p_pin.get<unsigned>()!=topLed||d.p_pin__low.get<unsigned>()!=(topLed^1)){
   std::cerr<<"LED mismatch at cycle "<<i<<"\n";return 1;}
  checks+=4;
 }
 std::cout<<"PASS minimal LED: "<<checks<<" comparisons; H=1/3, pause, resume, reset synchronizer and polarity\n";
}
