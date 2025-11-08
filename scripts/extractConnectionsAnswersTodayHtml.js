const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('connectionssolver-answers-today.html', 'utf8');

// Extract head content
const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
const head = headMatch ? headMatch[1].trim() : '';

// Extract body content
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const body = bodyMatch ? bodyMatch[1].trim() : '';

// Write to data directory
fs.writeFileSync(path.join('data', 'connections-answers-today-head.html'), head);
fs.writeFileSync(path.join('data', 'connections-answers-today-body.html'), body);

console.log('Successfully extracted connections-answers-today head and body content');
console.log('Head length:', head.length);
console.log('Body length:', body.length);