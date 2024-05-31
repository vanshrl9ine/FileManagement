const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  
  if (req.method === 'POST' && pathname === '/create') {
    const filePath = path.join(__dirname, query.filename);
    fs.writeFile(filePath, query.content || '', (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error creating file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File created successfully');
      }
    });
  } else if (req.method === 'GET' && pathname === '/read') {
    const filePath = path.join(__dirname, query.filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } else if (req.method === 'DELETE' && pathname === '/delete') {
    const filePath = path.join(__dirname, query.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error deleting file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File deleted successfully');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid request');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
