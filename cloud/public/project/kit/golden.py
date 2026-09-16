"""Deterministic edge reference. Python 3; Pillow only needed for external images.
python golden.py --out results              # built-in synthetic RGB image
python golden.py --image input.png --out results --threshold 300
Baseline: RGB888, integer gray floor, Sobel correlation, L1 magnitude,
strict > threshold, VALID crop (W-2)*(H-2), output coordinates in original image.
"""
import argparse,json,math
from pathlib import Path
KX=((-1,0,1),(-2,0,2),(-1,0,1))
KY=((-1,-2,-1),(0,0,0),(1,2,1))
def gray_float(rgb):
 r,g,b=rgb;return .299*r+.587*g+.114*b
def gray_int(rgb):
 r,g,b=rgb;return (77*r+150*g+29*b)>>8
def gradient(window):
 gx=sum(window[y][x]*KX[y][x] for y in range(3) for x in range(3))
 gy=sum(window[y][x]*KY[y][x] for y in range(3) for x in range(3))
 return gx,gy

def process(rgb,threshold=300):
 if not 0<=threshold<=2047:raise ValueError('threshold must be 0..2047')
 h=len(rgb);w=len(rgb[0]) if h else 0
 if h<3 or w<3 or any(len(row)!=w for row in rgb):raise ValueError('rectangular image at least 3x3 required')
 if any(len(p)!=3 or any(not isinstance(v,int) or not 0<=v<=255 for v in p) for row in rgb for p in row):raise ValueError('RGB888 integer channels required')
 gray=[[gray_int(p) for p in row] for row in rgb]
 ref=[[gray_float(p) for p in row] for row in rgb]
 errors=[abs(gray[y][x]-ref[y][x]) for y in range(h) for x in range(w)]
 pixels=[];float_edges=[];magnitudes=[]
 for y in range(1,h-1):
  edge_row=[];mag_row=[]
  for x in range(1,w-1):
   gx,gy=gradient([r[x-1:x+2] for r in gray[y-1:y+2]])
   fx,fy=gradient([r[x-1:x+2] for r in ref[y-1:y+2]])
   mag=abs(gx)+abs(gy);edge=255 if mag>threshold else 0
   pixels.append((x,y,gray[y][x],gx,gy,mag,edge))
   edge_row.append(255 if math.hypot(fx,fy)>threshold else 0)
   mag_row.append(mag)
  float_edges.append(edge_row);magnitudes.append(mag_row)
 metrics={'width':w,'height':h,'count':len(pixels),'threshold':threshold,'border':'valid-crop','gray_max_abs_error':max(errors),'gray_mean_abs_error':sum(errors)/len(errors),'edge_disagreements_float_l2_vs_integer_l1':sum(p[-1]!=float_edges[p[1]-1][p[0]-1] for p in pixels)}
 return gray,pixels,magnitudes,float_edges,metrics

def pgm(path,rows,maxval=255):
 path.write_text('P2\n%d %d\n%d\n'%(len(rows[0]),len(rows),maxval)+'\n'.join(' '.join(map(str,row)) for row in rows)+'\n')
def run():
 ap=argparse.ArgumentParser();ap.add_argument('--image');ap.add_argument('--out',default='results');ap.add_argument('--threshold',type=int,default=300);a=ap.parse_args()
 if a.image:
  from PIL import Image
  im=Image.open(a.image).convert('RGB');w,h=im.size;flat=list(im.getdata());rgb=[[tuple(flat[y*w+x]) for x in range(w)] for y in range(h)]
 else:
  w,h=8,6;rgb=[[(255 if x>=4 else 0,40*y,20*x) for x in range(w)] for y in range(h)]
 out=Path(a.out);out.mkdir(parents=True,exist_ok=True)
 gray,pixels,mags,floatedges,metrics=process(rgb,a.threshold)
 (out/'original.ppm').write_text('P3\n%d %d\n255\n'%(w,h)+'\n'.join(' '.join(str(v) for p in row for v in p) for row in rgb)+'\n')
 pgm(out/'gray.pgm',gray);pgm(out/'sobel-l1.pgm',mags,2047);pgm(out/'float-l2-edge.pgm',floatedges)
 pgm(out/'edge.pgm',[[p[-1] for p in pixels[i:i+w-2]] for i in range(0,len(pixels),w-2)])
 # RGB stimulus: one 24-bit RGB word per line, raster order, no blanking samples.
 (out/'input.hex').write_text(''.join('%02x%02x%02x\n'%tuple(p) for row in rgb for p in row))
 (out/'expected.txt').write_text(''.join('%d %d %d\n'%(p[0],p[1],p[-1]) for p in pixels))
 (out/'stages.csv').write_text('x,y,gray,gx,gy,magnitude,edge\n'+''.join(','.join(map(str,p))+'\n' for p in pixels))
 (out/'metrics.json').write_text(json.dumps(metrics,indent=2)+'\n');print(json.dumps(metrics,indent=2))
if __name__=='__main__':run()
