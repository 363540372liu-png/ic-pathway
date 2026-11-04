#include "engineering.cpp"
#include <deque>
#include <iostream>
using namespace cxxrtl_design;
int main(){
 p_engineering__fixture dut;std::deque<unsigned> q;unsigned mem[16]={};bool known[16]={};
 bool uv=0,utx=1,rv=0;unsigned frame=1023,tick=0,bit=0,rvdata=0;int checks=0,frames=0,wraps=0;
 auto fail=[&](const char* what,int t){std::cerr<<what<<" mismatch at cycle "<<t<<"\n";return 1;};
 // Several thousand cycles exercise all 256 UART bytes, FIFO boundaries and backpressure.
 unsigned sent=0;
 for(int t=0;t<12000;t++){
  bool r=t!=0&&t!=7000,push=(t%5!=0),pop=(t%7<4),we=(t%3==0),start=!uv&&sent<256;
  unsigned data=start?sent:((t*73+19)&255),addr=(t*7)&15;bool sv=t%4!=0,mr=t%9<5;
  dut.p_clk.set<bool>(0);dut.p_rst__n.set<bool>(r);dut.p_push.set<bool>(push);dut.p_pop.set<bool>(pop);dut.p_we.set<bool>(we);dut.p_start.set<bool>(start);dut.p_sv.set<bool>(sv);dut.p_mr.set<bool>(mr);dut.p_data.set<unsigned>(data);dut.p_addr.set<unsigned>(addr);dut.step();dut.step();
  bool full=q.size()==4,empty=q.empty(),wr=push&&!full,rd=pop&&!empty,ready=!rv||mr;
  if(t>0&&(dut.p_full.get<bool>()!=full||dut.p_empty.get<bool>()!=empty))return fail("FIFO flags",t);
  if(t>0&&!empty){checks++;if(dut.p_front.get<unsigned>()!=q.front())return fail("FIFO order",t);}
  if(rd&&!empty)q.pop_front();if(wr)q.push_back(data);if(!r)q.clear();if(t%31==0)wraps++;
  bool checkRam=known[addr];unsigned expectedRam=mem[addr];if(we){mem[addr]=data;known[addr]=true;}
  if(!r){uv=false;utx=true;frame=1023;tick=bit=0;rv=false;rvdata=0;}
  else{
   if(!uv){utx=true;if(start){frame=(1u<<9)|(data<<1);utx=false;uv=true;tick=bit=0;sent++;}}
   else if(tick==3){tick=0;if(bit==9){utx=true;uv=false;frames++;}else{bit++;utx=(frame>>bit)&1;}}
   else tick++;
   if(ready){rv=sv;if(sv)rvdata=data;}
  }
  dut.p_clk.set<bool>(1);dut.step();dut.step();
  if(dut.p_tx.get<bool>()!=utx||dut.p_busy.get<bool>()!=uv)return fail("UART frame/bit duration",t);
  if(dut.p_mv.get<bool>()!=rv||dut.p_rv__data.get<unsigned>()!=rvdata)return fail("Ready/valid hold",t);
  if(checkRam&&dut.p_ram__q.get<unsigned>()!=expectedRam)return fail("RAM read-first",t);
  if(dut.p_full.get<bool>()!=(q.size()==4)||dut.p_empty.get<bool>()!=q.empty())return fail("FIFO occupancy",t);
  checks+=7;
 }
 if(sent!=256||frames<255||wraps<10)return fail("Coverage",12000);
 std::cout<<"PASS "<<checks<<" engineering comparisons; 256 UART payloads, RAM read-first, FIFO wrap/boundaries and RV stalls\n";
}
