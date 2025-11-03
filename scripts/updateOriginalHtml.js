const fs = require('fs');
const path = require('path');

const head = fs.readFileSync(path.join('data', 'home-head.html'), 'utf8');
const body = fs.readFileSync(path.join('data', 'home-body.html'), 'utf8');

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body>
${body}
</body>
</html>`;

fs.writeFileSync(path.join('public', 'original.html'), fullHtml);
console.log('Successfully created public/original.html');
