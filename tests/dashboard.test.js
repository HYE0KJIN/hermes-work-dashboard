const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const dom = new JSDOM(fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8'), {
    url: 'https://detailflow.test/',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    beforeParse(window) {
      window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
      window.HTMLElement.prototype.scrollIntoView = () => {};
    }
  });
  dom.window.eval(fs.readFileSync(path.join(process.cwd(), 'app.js'), 'utf8'));
  const { document, Event } = dom.window;

  assert.equal(document.querySelectorAll('#queueBody tr').length, 7, 'initial queue renders all seven products');
  assert.equal(document.querySelectorAll('#cutGrid .cut').length, 9, 'initial workflow renders nine detail cuts');
  assert.equal(document.querySelectorAll('#threadItems .thread-item').length, 3, 'initial Threads content queue renders three entries');
  document.querySelector('#threadTopic').value = '상세페이지 전환 팁 5가지';
  document.querySelector('#draftThreadButton').click();
  assert.equal(document.querySelectorAll('#threadItems .thread-item').length, 4, 'draft action appends a Threads content entry');
  assert.match(document.querySelector('#threadItems').textContent, /상세페이지 전환 팁 5가지/, 'new Threads topic is visible in the queue');
  assert.equal(document.querySelector('#runButton').disabled, true, 'generation stays locked before fact review');

  document.querySelector('#statusFilter').value = 'running';
  document.querySelector('#statusFilter').dispatchEvent(new Event('change', { bubbles: true }));
  assert.equal(document.querySelectorAll('#queueBody tr').length, 1, 'status filter narrows the queue');

  document.querySelector('#clearFilters').click();
  document.querySelector('#factToggle').click();
  assert.equal(document.querySelector('#runButton').disabled, false, 'fact review unlocks generation');

  document.querySelector('#runButton').click();
  await wait(4600);
  assert.equal(document.querySelectorAll('#cutGrid .cut.ready').length, 9, 'demo generation completes all nine cuts');
  assert.equal(document.querySelector('#previewButton').disabled, false, 'preview unlocks after generation');

  console.log('dashboard interaction test: PASS');
  dom.window.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
