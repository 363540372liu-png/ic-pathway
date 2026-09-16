"""python compare.py expected.txt rtl.txt
Files: x y edge, decimal, one valid output per line, original-image center coords.
Order and count matter. Nonzero exit on first mismatch, malformed or empty file.
"""
import argparse
from pathlib import Path

def load(path):
 rows=[]
 for n,line in enumerate(Path(path).read_text().splitlines(),1):
  if not line.strip():continue
  parts=line.split()
  if len(parts)!=3:raise ValueError(f'{path}:{n}: expected x y edge')
  try:r=tuple(map(int,parts))
  except ValueError:raise ValueError(f'{path}:{n}: nondecimal / X / Z value')
  if min(r[:2])<0 or r[2] not in (0,255):raise ValueError(f'{path}:{n}: invalid coordinate or binary edge')
  rows.append(r)
 if not rows:raise ValueError(f'{path}: no valid output rows')
 return rows

def compare(expected,actual):
 for i,(a,b) in enumerate(zip(expected,actual)):
  if a!=b:return f'FAIL first mismatch index={i}, expected(x,y,edge)={a}, actual={b}'
 if len(expected)!=len(actual):return f'FAIL count expected={len(expected)} actual={len(actual)}; first missing/extra index={min(len(expected),len(actual))}'
 return f'PASS {len(expected)} pixels: exact coordinates, order and values'
def run():
 ap=argparse.ArgumentParser();ap.add_argument('expected');ap.add_argument('actual');a=ap.parse_args()
 try:result=compare(load(a.expected),load(a.actual))
 except (ValueError,OSError) as e:result='FAIL '+str(e)
 print(result);raise SystemExit(0 if result.startswith('PASS ') else 1)
if __name__=='__main__':run()
