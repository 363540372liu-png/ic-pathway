import fs from 'node:fs';
import path from 'node:path';
const assets={};
function collect(dir,prefix=''){for(const name of fs.readdirSync(dir)){if(name==='__pycache__'||name.endsWith('.pyc')||name.startsWith('.'))continue;const p=path.join(dir,name),key=prefix+'/'+name;if(fs.statSync(p).isDirectory())collect(p,key);else assets[key]=fs.readFileSync(p).toString('base64');}}
collect('public');
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist/server',{recursive:true});fs.mkdirSync('dist/.openai',{recursive:true});
fs.writeFileSync('dist/server/index.js','const ASSETS='+JSON.stringify(assets)+';\n'+fs.readFileSync('worker/index.js','utf8'));
fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
if(fs.existsSync('drizzle'))fs.cpSync('drizzle','dist/.openai/drizzle',{recursive:true});
console.log('Built course assets, authenticated progress API, and migrations.');
