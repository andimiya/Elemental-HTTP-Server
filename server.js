const http = require('http');
const PORT = process.env.PORT || 1234;
const fs = require('fs');

const server = http.createServer( (req, res) => {

  let reqBody = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    reqBody += chunk;
  });

  req.on('end', () => {

    if (req.url === '/') {
      fs.readFile('./public/index.html', (err, content) => {
        if (err) {
          res.statusCode = 500;
          res.write('Server fault occured\n');
        }
        res.write(content);
        res.end();
      });
    }
    else if (req.url === '/hydrogen') {
      fs.readFile('./public/hydrogen.html', (err, content) => {
        if (err) {
          res.statusCode = 500;
          res.write('Server fault occured\n');
        }
        res.write(content);
        res.end();
      });
    }
    else if (req.url === '/helium') {
      fs.readFile('./public/helium.html', (err, content) => {
        if (err) {
          res.statusCode = 500;
          res.write('Server fault occured\n');
        }
        res.write(content);
        res.end();
      });
    }
    else if (req.url === '/css/styles.css') {
      fs.readFile('./public/css/styles.css', (err, content) => {
        if (err) {
          res.statusCode = 500;
          res.write('Server fault occured\n');
        }
        res.write(content);
        res.end();
      });
    }
    else {
      fs.readFile('./public/404.html', (err, content) => {
        if (err) {
          res.statusCode = 500;
          res.write('Server fault occured\n');
        }
        res.write(content);
        res.end();
      });
    }
  });
});

server.listen(PORT, () => {
  console.log('server is listening on port', PORT);
});