#include "fixture.cpp"
#include <cassert>
#include <iostream>
#include <vector>
using cxxrtl_design::p_fixture;
p_fixture d;
int received=0,errors=0;std::vector<unsigned> bytes;
void cycle(bool loop=false){d.p_clk.set(0u);d.step();if(loop)d.p_rx.set(d.p_tx.get<unsigned>());d.p_clk.set(1u);d.step();d.step();if(d.p_rxvalid.get<unsigned>()){received++;bytes.push_back(d.p_rxdata.get<unsigned>());}errors+=d.p_rxerror.get<unsigned>();}
void reset(){d.p_resetn.set(0u);d.p_start.set(0u);d.p_rx.set(1u);d.p_button.set(0u);d.p_en.set(0u);d.p_pulse.set(0u);d.p_valid.set(0u);cycle();cycle();d.p_resetn.set(1u);received=errors=0;bytes.clear();}
void serial(unsigned data,bool stop=true){d.p_rx.set(0u);for(int i=0;i<8;i++)cycle();for(int b=0;b<8;b++){d.p_rx.set((data>>b)&1u);for(int i=0;i<8;i++)cycle();}d.p_rx.set(unsigned(stop));for(int i=0;i<8;i++)cycle();}
int main(){
 reset();assert(d.p_tx.get<unsigned>()==1&&d.p_busy.get<unsigned>()==0);
 for(unsigned x=0;x<4;x++){d.p_a.set(x>>1);d.p_b.set(x&1);d.step();assert(d.p_y.get<unsigned>()==(x==3));}
 d.p_data.set(165u);d.p_en.set(1u);cycle();assert(d.p_q.get<unsigned>()==165);d.p_en.set(0u);d.p_data.set(60u);cycle();assert(d.p_q.get<unsigned>()==165);
 reset();for(int i=1;i<=30;i++){cycle();assert(d.p_tick.get<unsigned>()==unsigned(i%5==0));}assert(d.p_lights.get<unsigned>()==1);
 d.p_en.set(1u);unsigned previous=d.p_lights.get<unsigned>();for(int i=0;i<20;i++){unsigned tick=d.p_tick.get<unsigned>();cycle();unsigned expected=tick?((previous<<1)&15)|(previous>>3):previous;assert(d.p_lights.get<unsigned>()==expected);previous=expected;}
 reset();for(unsigned duty:{0u,1u,128u,255u,256u}){d.p_duty.set(duty);int high=0;for(int i=0;i<256;i++){cycle();high+=d.p_pwm.get<unsigned>();}assert(high==int(duty));}
 reset();int rises=0;for(unsigned x:{1u,0u,1u,0u}){d.p_button.set(x);cycle();rises+=d.p_rise.get<unsigned>();}assert(!rises);d.p_button.set(1u);for(int i=0;i<20;i++){cycle();rises+=d.p_rise.get<unsigned>();}assert(rises==1&&d.p_pressed.get<unsigned>()==1);d.p_button.set(0u);for(int i=0;i<12;i++)cycle();assert(d.p_pressed.get<unsigned>()==0);
 reset();d.p_valid.set(1u);d.p_data.set(0x31u);cycle();assert(d.p_cmdled.get<unsigned>()==1);d.p_data.set(0x55u);cycle();assert(d.p_cmdled.get<unsigned>()==1);d.p_valid.set(0u);d.p_data.set(0x30u);cycle();assert(d.p_cmdled.get<unsigned>()==1);d.p_valid.set(1u);cycle();assert(d.p_cmdled.get<unsigned>()==0);
 // Vendor-neutral extensions: bubble alignment, backpressure, FIFO order, RAM and fixed-point.
 reset();d.p_valid.set(1u);d.p_data.set(42u);cycle();assert(d.p_pipeq.get<unsigned>()==42&&d.p_pipevalid.get<unsigned>()==1);d.p_valid.set(0u);cycle();assert(d.p_pipevalid.get<unsigned>()==0);
 reset();d.p_valid.set(1u);d.p_data.set(99u);cycle();d.p_valid.set(0u);d.p_data.set(11u);for(int i=0;i<4;i++){cycle();assert(d.p_elasticvalid.get<unsigned>()==1&&d.p_elasticq.get<unsigned>()==99&&d.p_inready.get<unsigned>()==0);}d.p_en.set(1u);cycle();assert(d.p_elasticvalid.get<unsigned>()==0);
 reset();for(unsigned x=0;x<4;x++){d.p_valid.set(1u);d.p_data.set(20+x);cycle();}assert(d.p_fifofull.get<unsigned>()==1);d.p_data.set(99u);cycle();d.p_valid.set(0u);d.p_pulse.set(1u);for(unsigned x=0;x<4;x++){cycle();assert(d.p_fifovalid.get<unsigned>()==1&&d.p_fifoq.get<unsigned>()==20+x);}cycle();assert(d.p_fifoempty.get<unsigned>()==1&&d.p_fifovalid.get<unsigned>()==0);
 reset();d.p_data.set(165u);d.p_valid.set(1u);cycle();d.p_valid.set(0u);cycle();assert(d.p_ramq.get<unsigned>()==165);
 for(unsigned x=0;x<256;x++){d.p_data.set(x);d.p_duty.set(384u);d.step();unsigned expected=(x*384+128)>>8;if(expected>255)expected=255;assert(d.p_scaled.get<unsigned>()==expected);}
 // Test transmitter against independent 8N1 bit expectations, plus RX loopback for every byte.
 for(unsigned data=0;data<256;data++){
  reset();d.p_data.set(data);d.p_start.set(1u);cycle(true);d.p_start.set(0u);
  for(int i=0;i<80;i++){unsigned expected=i<8?0:i>=72?1:(data>>((i/8)-1))&1;assert(d.p_tx.get<unsigned>()==expected);assert(d.p_busy.get<unsigned>()==1);cycle(true);}
  assert(d.p_done.get<unsigned>()==1&&d.p_busy.get<unsigned>()==0);for(int i=0;i<12;i++)cycle(true);assert(received==1&&errors==0&&bytes[0]==data);assert(d.p_done.get<unsigned>()==0);
 }
 // Back-to-back frames without idle gap; invalid stop, false start, reset interruption.
 reset();serial(0x31);serial(0xa5);d.p_rx.set(1u);for(int i=0;i<12;i++)cycle();assert((bytes==std::vector<unsigned>{0x31,0xa5})&&errors==0);
 reset();serial(0x55,false);d.p_rx.set(1u);for(int i=0;i<16;i++)cycle();assert(received==0&&errors==1);
 reset();d.p_rx.set(0u);cycle();d.p_rx.set(1u);for(int i=0;i<100;i++)cycle();assert(received==0&&errors==0);
 reset();d.p_start.set(1u);cycle(true);d.p_start.set(0u);for(int i=0;i<20;i++)cycle(true);reset();for(int i=0;i<100;i++)cycle(true);assert(received==0&&errors==0&&d.p_tx.get<unsigned>()==1);
 std::cout<<"PASS: RTL-derived CXXRTL simulation; all 256 UART bytes, bit order/width, back-to-back frames, bad stop, false start, reset, counter enable, LED, PWM and button filtering\n";
}
