const http = require('http');
const PORT = process.env.PORT || 1234;
const fs = require('fs');
const querystring = require('querystring');



const server = http.createServer( (req, res) => {

  var options = {
    hostname: 'localhost',
    port: 1234,
    path: '/elements',
    method: 'POST',
  };

  res.write('YES');
  fs.writeFile('Boron.txt', reqBody, (err) => {
    // if (err) throw err;
    console.log('It\'s saved!');
  });


  var reqBody = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    reqBody += chunk;
  console.log(reqBody, 'reqbody');
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