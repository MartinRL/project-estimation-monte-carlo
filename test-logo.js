const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true
  });

  const page = await puppeteer.newPage();

  // Enable console logging
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log('Navigating to http://127.0.0.1:3000/index.html...');
  await page.goto('http://127.0.0.1:3000/index.html', { waitUntil: 'networkidle0' });

  // Wait a bit for rendering
  await page.waitForTimeout(2000);

  // Check if SVG is in DOM
  const svgExists = await page.evaluate(() => {
    const svg = document.querySelector('.header-logo');
    if (!svg) return { exists: false };

    const computed = window.getComputedStyle(svg);
    const rects = svg.querySelectorAll('rect');
    const bbox = svg.getBBox();

    return {
      exists: true,
      tagName: svg.tagName,
      width: svg.getAttribute('width'),
      height: svg.getAttribute('height'),
      viewBox: svg.getAttribute('viewBox'),
      computedDisplay: computed.display,
      computedWidth: computed.width,
      computedHeight: computed.height,
      rectCount: rects.length,
      bboxWidth: bbox.width,
      bboxHeight: bbox.height,
      innerHTML: svg.innerHTML
    };
  });

  console.log('\n=== SVG Diagnostic ===');
  console.log(JSON.stringify(svgExists, null, 2));

  // Take screenshot
  await page.screenshot({
    path: 'screenshot-header.png',
    clip: { x: 0, y: 0, width: 1200, height: 200 }
  });
  console.log('\nScreenshot saved to screenshot-header.png');

  // Keep browser open for manual inspection
  console.log('\nBrowser left open for manual inspection. Press Ctrl+C to close.');
})();
