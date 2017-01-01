const http = require('http');
const PORT = process.env.PORT || 1234;
const fs = require('fs');
const querystring = require('querystring');

// var elementName = '';
// var elementSymbol = '';
// var elementAtomicNumber = '';
// var elementDescription = '';
// var newFileName = '';


const server = http.createServer( (req, res) => {

  var options = {
    hostname: 'localhost',
    port: 1234,
    path: '/elements',
    method: 'POST',
  };

  var reqBody = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    reqBody += chunk;

  var reqSplit = querystring.parse(reqBody);
  var elementName = reqSplit.elementName;
  var newFileName = elementName + ".html";
  var elementSymbol = reqSplit.elementSymbol;
  var elementAtomicNumber = reqSplit.elementAtomicNumber;
  var elementDescription = reqSplit.elementDescription;

  res.write('YES');
  console.log(newFileName);
  fs.writeFile(newFileName, 'test', (err) => {
    // if (err) throw err;
    console.log('It\'s saved!');
  });
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