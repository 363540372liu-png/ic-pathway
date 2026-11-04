import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';
const files=[];function visit(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())visit(p);else if(/\.(m?js)$/.test(p))files.push(p)}}
for(const dir of ['public','worker','tools','tests'])visit(dir);
for(const file of files){const r=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(r.status){process.stderr.write(r.stderr);process.exit(r.status||1)}}
console.log('PASS syntax lint:',files.length,'JavaScript files');
