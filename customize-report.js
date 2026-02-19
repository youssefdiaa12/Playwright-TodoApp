const fs = require("fs");
const path = require("path");

const reportPath = path.join(__dirname, "playwright-report", "index.html");

if (!fs.existsSync(reportPath)) {
    console.log("Report not found ❌");
    return;
}

let html = fs.readFileSync(reportPath, "utf8");

const branding = `
<div style="text-align:center;padding:20px;background:#fff;">
    <img src="./assets/company-logo.png" width="160"/>
    <h1>ISKRA Egypt Automation Report</h1>
</div>
`;

html = html.replace("<body>", `<body>${branding}`);

fs.writeFileSync(reportPath, html);

console.log("Report customized successfully ✅");
