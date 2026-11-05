const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 794, height: 1400 } });
  await pg.goto('file://' + path.resolve(process.argv[2]), { waitUntil: 'networkidle' });
  const h = await pg.evaluate(() => Math.ceil(document.querySelector('.in').getBoundingClientRect().bottom));
  await b.close();
  console.log(h);
})();
