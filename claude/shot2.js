const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const H = parseInt(process.argv[4] || '1123', 10);
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 794, height: H }, deviceScaleFactor: 3 });
  await pg.goto('file://' + path.resolve(process.argv[2]), { waitUntil: 'networkidle' });
  await pg.screenshot({ path: path.resolve(process.argv[3]) });
  await b.close();
  console.log('png ok');
})();
