import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {execFileSync} from 'node:child_process';import worker from '../worker/index.js';import crypto from 'node:crypto';
test('release and versioned assets are served without reusable cache and preserve query routing',async()=>{
 globalThis.ASSETS={'/index.html':Buffer.from('<html>release</html>').toString('base64'),'/release.json':Buffer.from('{"version":"4.0.1"}').toString('base64'),'/app.js':Buffer.from('/* same asset */').toString('base64')};
 try{
  for(const path of ['/?v=4.0.1','/release.json?check=1','/app.js?rev=abc']){
   const response=await worker.fetch(new Request('https://test.example'+path),{});assert.equal(response.status,200);assert.equal(response.headers.get('Cache-Control'),'no-store');
   if(path.startsWith('/release')){assert.match(response.headers.get('Content-Type'),/application\/json/);assert.equal((await response.json()).version,'4.0.1');}
  }
 }finally{delete globalThis.ASSETS;}
});
test('production HTML fingerprints every script and stylesheet with its actual content',()=>{
 execFileSync(process.execPath,['tools/build.mjs']);
 const source=fs.readFileSync('dist/server/index.js','utf8'),assets=JSON.parse(source.slice('const ASSETS='.length,source.indexOf(';\n')));
 const html=Buffer.from(assets['/index.html'],'base64').toString('utf8');let count=0;
 for(const m of html.matchAll(/(?:src|href)="([^"?]+\.(?:js|css))\?rev=([0-9a-f]{12})"/g)){assert.ok(assets[m[1]]);assert.equal(m[2],crypto.createHash('sha256').update(Buffer.from(assets[m[1]],'base64')).digest('hex').slice(0,12));count++;}
 assert.equal(count,(html.match(/<(?:script|link)\b[^>]*(?:src|href)="[^" ]+\.(?:js|css)/g)||[]).length);assert.ok(count>25);
 assert.ok(html.includes('交互教材 v'+JSON.parse(fs.readFileSync('package.json','utf8')).version));assert.match(html,/id="check-release"/);
});
