import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context = vm.createContext({window:{}});
for (const file of ['curriculum','hdl-content','textbook-content','textbook-depth','fpga/led-project','fpga/catalog','fpga/content']) {
  vm.runInContext(fs.readFileSync('public/'+file+'.js','utf8'),context);
}
const site=context.window;
test('all reference routes lead to an existing foundation',()=>{
  for(const lesson of site.IC_COURSE.LESSONS){
    assert.ok(site.HDL_LESSONS.some(l=>l.id===lesson.foundation),lesson.id);
  }
});
test('every wave prediction has one identified answer trace and visible stimulus',()=>{
  const predictions=site.HDL_LESSONS.flatMap(l=>l.lab.exercises.filter(x=>x.wave));
  assert.equal(predictions.length,6);
  for(const {wave} of predictions){
    assert.equal(wave.signals.filter(([name])=>name===wave.predictSignal).length,1);
    assert.ok(wave.signals.some(([name])=>name==='clk'&&name!==wave.predictSignal));
  }
});
test('every vendor has project A instructions for synthesis through download',()=>{
  const adapters=site.IC_FPGA_LED_PROJECT.tools;
  for(const tool of ['vivado','quartus','efinity']){
    assert.deepEqual(Object.keys(adapters[tool]),['3','4','5','6']);
    assert.match(JSON.stringify(adapters[tool][3]),/led_minimal/);
    assert.doesNotMatch(JSON.stringify(adapters[tool]),/uart_led|uart_rx/);
  }
});
