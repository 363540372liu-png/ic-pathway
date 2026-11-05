"""Elaborate authored repair references in explicit scopes, plus the early AND TB.
This does not grade arbitrary student source and is not functional simulation.
"""
from pathlib import Path
import json,subprocess,sys
from pyslang.syntax import SyntaxTree
from pyslang.ast import Compilation
r=Path(__file__).resolve().parents[1]
script="import fs from 'node:fs';import vm from 'node:vm';let c={window:{}};vm.createContext(c);for(let f of ['hdl-content','textbook-content','textbook-depth'])vm.runInContext(fs.readFileSync('public/'+f+'.js','utf8'),c);console.log(JSON.stringify(c.window.HDL_LESSONS));"
L=json.loads(subprocess.check_output(['node','--input-type=module','-e',script],cwd=r,text=True));D={l['id']:l for l in L}
scopes={
'module':('module and2(input wire a,b,output wire y); assign y=a&b; endmodule\nmodule fixture(input wire p,q,output wire lamp);','endmodule'),
'net-var':('module fixture(a,b,y); input wire a,b;','endmodule'),
'vectors':('module fixture(input wire [7:0] data,output wire [7:0] rotated);','endmodule'),
'operators':('module fixture(input wire [3:0] req,output wire any_req);','endmodule'),
'width-sign':('module fixture(input wire signed [3:0] sample,output wire signed [7:0] wide);','endmodule'),
'casts':('module fixture(input wire [3:0] raw,output wire [7:0] magnitude);','endmodule'),
'branches':('module fixture(input wire en,hot,output reg lamp,alarm);','endmodule'),
'case-latch':('module fixture(input wire [1:0] mode,output reg red,green);','endmodule'),
'casez':('module fixture(input wire [3:0] req,output reg [1:0] idx);','endmodule'),
'loops':('module fixture(input wire [3:0] flags,output reg any_set); integer i;','endmodule'),
'parameters':('module fixture #(parameter WIDTH=4)();','endmodule'),
'functions':('module fixture();','endmodule'),
'edges':('module fixture(input wire clk,button,output reg saved);','endmodule'),
'nba':('module fixture(input wire clk,d,output reg [2:0] stages);','endmodule'),
'reset':('module fixture(input wire clk,rst_n,en,d,output reg q);','endmodule'),
'counter':('module fixture(input wire clk,rst_n,en,output reg [2:0] q);','endmodule'),
'shift-pulse':('module fixture(input wire clk,rst_n,sig,output reg pulse); reg prev;','endmodule'),
'alu':('module fixture(input wire [3:0] a,b,input wire op,output reg [3:0] y);','endmodule'),
'fsm':('module fixture(input wire start,finish); localparam IDLE=0,RUN=1; reg state,next_state;','endmodule'),
'moore-mealy':('module fixture(input wire prev,bit_in,output wire detect);','endmodule'),
'sv-logic':('module fixture();','endmodule'),
'sv-always':('module fixture(input logic a,b,output logic y);','endmodule'),
'sv-latch':('module fixture(input logic gate_n,d,output logic q);','endmodule'),
'sv-arrays':('module fixture();','endmodule'),
'sv-types':('module fixture(); typedef struct packed {logic [3:0] tag; logic [7:0] value;} item_t; wire item_t item;','endmodule'),
 'testbench':('module fixture; reg clk=0;','endmodule'),
'checking':('module fixture; wire [3:0] actual; reg [3:0] expected; initial begin','end endmodule'),
'fifo-project':('module fixture(input logic clk,wr,input logic [7:0] din); logic [1:0] wp; logic [7:0] mem[0:3]; always_ff @(posedge clk) begin','end endmodule'),
'sv-handshake':('module fixture(input logic clk,rst_n,ready,output logic [7:0] data);','endmodule'),
'integration':('module fixture(input logic m_valid,m_ready,output wire s_ready);','endmodule'),
'sv-tasks':('module fixture; int expected[$]; int ref_value; initial begin','end endmodule'),
'sv-verification':('class fixture; rand bit [3:0] value;','endclass')}
errors=[];passed=[]
def check(name,code):
 c=Compilation();c.addSyntaxTree(SyntaxTree.fromText('`timescale 1ns/1ps\n'+code));c.getRoot();bad=[str(d.code) for d in c.getAllDiagnostics() if d.isError()]
 if bad:errors.append((name,bad))
 else:passed.append(name)
for l in L:
 for x in l['lab']['exercises']:
  if x['kind']=='repair':
   before,after=scopes[l['id']];check(l['id'],before+'\n'+x['solution']+'\n'+after)
check('early-four-vector-TB',D['module']['lab']['sequence'][0]['code']+'\n'+D['tool-start']['lab']['sequence'][0]['code'])
check('LED-project-TB',(r/'public/fpga/rtl/led_minimal.v').read_text()+'\n'+(r/'public/fpga/tb/tb_led_minimal.sv').read_text())
print('PASS' if not errors else 'FAIL',len(passed),'repair/early-TB/LED scoped examples;',errors)
(r/'.sites-runtime/practice-elaboration.json').write_text(json.dumps({'passed':passed,'errors':errors},indent=2))
sys.exit(bool(errors))
