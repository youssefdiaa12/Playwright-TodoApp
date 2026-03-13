const fs = require('fs');
const path = require('path');

const dataPath = path.resolve('./custom-results.json');
if (!fs.existsSync(dataPath)) {
  console.error('custom-results.json not found. Run tests with --reporter=json > custom-results.json');
  process.exit(1);
}

let raw = fs.readFileSync(dataPath, 'utf8');
// Strip BOM if present
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
let report;
try {
  report = JSON.parse(raw);
} catch (err) {
  console.error('Failed to parse JSON:', err.message);
  process.exit(1);
}

const stats = report.stats || {};
const suites = report.suites || [];

const totalTests = stats.expected || 0;
const skipped = stats.skipped || 0;
const unexpected = stats.unexpected || 0;
const flaky = stats.flaky || 0;
const passed = totalTests - skipped - unexpected - flaky;
const failed = unexpected + flaky;

const fileName = `custom-report.html`;
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Custom Playwright Report</title>
  <style>
    body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 0; background:#f5f7ff; color:#1f2937; padding:24px; }
    .container { max-width:960px; margin: 0 auto; background:white; border-radius:12px; padding:20px; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
    h1 { font-size: 1.8rem; margin-bottom:0.35rem; }
    .summary { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px; margin-bottom:16px; }
    .card { border:1px solid #e5e7eb; border-radius:10px; padding:12px; background:#fff; }
    .card .value { font-size:1.55rem; font-weight:700; margin:4px 0; }
    .suite { margin-top:16px; }
    .suite pre { background:#111827; color:#d1d5db; padding:12px; border-radius:8px; overflow:auto; }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <div class="container">
    <h1>Custom Playwright Report</h1>
    <p>Generated at ${new Date().toLocaleString()}</p>
    <div class="summary">
      <div class="card"><div>Total Tests</div><div class="value">${totalTests}</div></div>
      <div class="card"><div>Passed</div><div class="value">${passed}</div></div>
      <div class="card"><div>Failed</div><div class="value">${failed}</div></div>
      <div class="card"><div>Skipped</div><div class="value">${skipped}</div></div>
    </div>
    <div style="margin:20px 0; width:100%; max-width:520px;"><canvas id="summaryChart"></canvas></div>
    <div class="suite"><h2>Test Suites</h2>
      <ul>
        ${suites.map(s => `<li><strong>${s.title || 'Suite'}</strong> - ${s.file || ''} - specs: ${s.specs.length}</li>`).join('\n')}
      </ul>
    </div>
    <div class="suite"><h2>Raw Stats JSON</h2><pre>${JSON.stringify(stats, null, 2)}</pre></div>
  </div>
  <script>
    const ctx = document.getElementById('summaryChart');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Passed', 'Failed', 'Skipped'],
        datasets: [{
          data: [${passed}, ${failed}, ${skipped}],
          backgroundColor: ['#22c55e', '#ef4444', '#f59e0b']
        }]
      },
      options: { plugins: { legend: { position: 'bottom' } } }
    });
  </script>
</body>
</html>`;

fs.writeFileSync(fileName, html, 'utf8');
console.log('Custom HTML report generated:', fileName);
