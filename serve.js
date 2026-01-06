const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  try {
    const requestUrl = decodeURI(req.url.split('?')[0]);
    let filePath = path.join(__dirname, requestUrl);
    if (requestUrl === '/' || requestUrl === '') filePath = path.join(__dirname, 'index.html');

    fs.stat(filePath, (err, stat) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
        console.log(`${req.method} ${req.url} -> 404`);
        return;
      }
      if (stat.isDirectory()) filePath = path.join(filePath, 'index.html');
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
      stream.on('error', (e) => {
        console.error('Stream error', e);
        res.statusCode = 500;
        res.end('Server error');
      });
    });
  } catch (e) {
    console.error('Request handling error', e);
    res.statusCode = 500;
    res.end('Server error');
  }
});

server.listen(port, '127.0.0.1', () => console.log(`Dev server listening on http://127.0.0.1:${port}`));
server.on('error', (e) => { console.error('Server error', e); });
