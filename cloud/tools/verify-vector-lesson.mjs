// Run with Icarus Verilog (iverilog and vvp) on PATH.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';

const ctx=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync('public/vector-lesson.js','utf8'),ctx);
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'vector-lesson-'));
try{
 const source=path.join(dir,'vector.v'), binary=path.join(dir,'vector.vvp');
 fs.writeFileSync(source,ctx.window.IC_VECTOR_LESSON.moduleCode+`
module tb;
  reg [7:0] bus;
  wire low_bit;
  wire [3:0] high_half, mask;
  wire [7:0] swapped;
  integer i;
  vector_demo dut(bus,low_bit,high_half,swapped,mask);
  initial begin
    for (i=0; i<256; i=i+1) begin
      bus = i[7:0];
      #1;
      if (low_bit !== (bus & 1'b1) || high_half !== (bus >> 4) ||
          swapped !== ((bus << 4) | (bus >> 4)) || mask !== 4'd15)
        $fatal(1, "Mismatch at input %0d", i);
    end
    $display("PASS all 256 Verilog inputs");
    $finish;
  end
endmodule
`);
 execFileSync('iverilog',['-g2005','-s','tb','-o',binary,source],{stdio:'inherit'});
 execFileSync('vvp',[binary],{stdio:'inherit'});
}finally{fs.rmSync(dir,{recursive:true,force:true});}
