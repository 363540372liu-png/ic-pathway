import importlib.util,itertools,tempfile,unittest,random,subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def load(name):
 spec=importlib.util.spec_from_file_location(name,ROOT/'public/project/kit'/f'{name}.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
g=load('golden');c=load('compare')
class Golden(unittest.TestCase):
 def test_known_vectors(self):
  self.assertEqual(g.gradient([[10,20,30],[40,50,60],[70,80,90]]),(80,240))
  for col,expected in [((255,0,0),76),((0,255,0),149),((0,0,255),28),((255,255,255),255)]:self.assertEqual(g.gray_int(col),expected)
  _,pixels,_,_,_=g.process([[(100,100,100)]*5 for _ in range(5)])
  self.assertEqual(len(pixels),9);self.assertTrue(all(p[-1]==0 for p in pixels));self.assertEqual(pixels[0][:2],(1,1));self.assertEqual(pixels[-1][:2],(3,3))
 def test_tight_sobel_bound_and_approximation(self):
  maximum=0
  for p in itertools.product((0,255),repeat=9):
   x,y=g.gradient([p[:3],p[3:6],p[6:]])
   self.assertLessEqual(abs(x),1020);self.assertLessEqual(abs(y),1020);maximum=max(maximum,abs(x)+abs(y))
  self.assertEqual(maximum,1530)
  rng=random.Random(42)
  for _ in range(10000):
   rgb=tuple(rng.randrange(256) for i in range(3));self.assertLess(abs(g.gray_int(rgb)-g.gray_float(rgb)),2)
 def test_comparator_rejects_each_failure_class(self):
  a=[(1,1,0),(2,1,255)];self.assertTrue(c.compare(a,a).startswith('PASS'))
  for b in [a[:1],a+[(3,1,0)],list(reversed(a)),[(1,1,255),a[1]]]:self.assertTrue(c.compare(a,b).startswith('FAIL'))
  with tempfile.TemporaryDirectory() as d:
   f=Path(d)/'bad.txt'
   for content in ['', '1 1 X', '1 1 128','1 1','-1 1 0']:
    f.write_text(content)
    with self.assertRaises(ValueError):c.load(f)
 def test_cli_outputs_real_artifacts(self):
  with tempfile.TemporaryDirectory() as d:
   subprocess.run([sys.executable,str(ROOT/'public/project/kit/golden.py'),'--out',d],check=True,capture_output=True)
   p=Path(d);self.assertEqual(len(c.load(p/'expected.txt')),24)
   for name in ['original.ppm','gray.pgm','sobel-l1.pgm','edge.pgm','float-l2-edge.pgm','metrics.json','input.hex','stages.csv']:self.assertTrue((p/name).stat().st_size>0)
if __name__=='__main__':unittest.main()
