const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  // 595x842pt -> 793.3x1122.7 CSS px ; scale 2.5 cho net
  const pg = await b.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2.5 });
  await pg.goto('file://' + path.resolve(process.argv[2]), { waitUntil: 'networkidle' });
  await pg.screenshot({ path: path.resolve(process.argv[3]) });
  await b.close(); console.log('png ok');
})();
