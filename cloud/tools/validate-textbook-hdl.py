"""Compile the complete textbook examples with pyslang; fragments are explicitly reported.
Uses a shared 1ns/1ps default for these independent check translation units.
This is elaboration, not functional simulation or gate timing verification.
"""
from pathlib import Path
import json,sys
from pyslang.syntax import SyntaxTree
from pyslang.ast import Compilation
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'public/hdl-content.js').read_text().split('=',1)[1].strip().rstrip(';'))
passed=[];errors=[];fragments=[]
for l in data:
 if 'module ' not in l['code'] and not l['code'].startswith('package'):
  fragments.append(l['id']);continue
 code=l['code']
 if l['id']=='testbench':code=next(x['code'] for x in data if x['id']=='counter')+'\n'+code
 code=chr(96)+'timescale 1ns/1ps\n'+code
 comp=Compilation();comp.addSyntaxTree(SyntaxTree.fromText(code));comp.getRoot()
 bad=[str(d.code) for d in comp.getAllDiagnostics() if d.isError()]
 if bad:errors.append({'lesson':l['id'],'errors':bad})
 else:passed.append(l['id'])
report={'tool':'pyslang','validation':'parse and elaborate independent complete examples','default_timescale':'1ns/1ps','passed':passed,'fragments_not_claimed_compiled':fragments,'errors':errors}
out=root/'.sites-runtime/textbook-elaboration.json';out.parent.mkdir(exist_ok=True);out.write_text(json.dumps(report,ensure_ascii=False,indent=2))
print('PASS' if not errors else 'FAIL',len(passed),'complete examples;',len(fragments),'explicit fragments;',errors)
sys.exit(bool(errors))
