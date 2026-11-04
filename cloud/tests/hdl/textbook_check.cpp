#include "textbook.cpp"
#include <iostream>
using namespace cxxrtl_design;
int main(){
 p_textbook__fixture dut;
 auto set=[&](bool clk,bool r,bool en,bool d,bool sel,int left,int right,bool start,bool finish){
  dut.p_clk.set<bool>(clk);dut.p_rst__n.set<bool>(r);dut.p_en.set<bool>(en);dut.p_d.set<bool>(d);
  dut.p_sel.set<bool>(sel);dut.p_left.set<unsigned>(left);dut.p_right.set<unsigned>(right);
  dut.p_start.set<bool>(start);dut.p_finish.set<bool>(finish);dut.step();dut.step();
 };
 // Establish known DFF/pipeline data via actual clock edges; no invented reset port.
 for(int i=0;i<3;i++){set(0,0,0,0,0,2,7,0,0);set(1,0,0,0,0,2,7,0,0);}
 unsigned a=0,b=0,count=0,enabled=0,state=0;int checks=0;
 for(unsigned t=0;t<80;t++){
  bool d=((t*7+3)%5)<2,en=(t%4)!=1,r=(t%17)!=0,sel=t%2,start=t%3==0,finish=t%5==0;
  unsigned left=t&15,right=(15-t)&15;
  set(0,r,en,d,sel,left,right,start,finish);
  if(dut.p_mux__y.get<unsigned>()!=(sel?right:left)){std::cerr<<"MUX mismatch\n";return 1;}
  auto olda=a;a=d;b=olda;
  if(!r){count=0;enabled=0;state=0;}
  else {if(en){count=(count+1)&15;enabled=d;}state=state?(finish?0:1):(start?1:0);}
  set(1,r,en,d,sel,left,right,start,finish);
  if(dut.p_ff__q.get<unsigned>()!=unsigned(d)||dut.p_pipe__a.get<unsigned>()!=a||dut.p_pipe__b.get<unsigned>()!=b||
     dut.p_count.get<unsigned>()!=count||dut.p_enabled__q.get<unsigned>()!=enabled||dut.p_busy.get<unsigned>()!=state){
   std::cerr<<"Sequential mismatch cycle "<<t<<" actual q/ena/busy "<<dut.p_count.get<unsigned>()<<"/"<<dut.p_enabled__q.get<unsigned>()<<"/"<<dut.p_busy.get<unsigned>()<<" expected "<<count<<"/"<<enabled<<"/"<<state<<"\n";return 1;
  }
  checks+=7;
 }
 std::cout<<"PASS "<<checks<<" CXXRTL functional comparisons (6 modules)\n";
}
