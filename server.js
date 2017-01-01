const http = require('http');
const PORT = process.env.PORT || 1234;
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer( (req, res) => {

  console.log(req.method, 'requestmethod');

  if (req.method === 'POST') {

    if (req.url === '/elements'){

      console.log('elementsFile');

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
        var newFileBody = `<html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>The Elements - ${elementName}</title>
          <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
          <h1>${elementName}</h1>
          <h2>${elementSymbol}</h2>
          <h3>Atomic number ${elementAtomicNumber}</h3>
          <p>${elementName} is a chemical element with symbol ${elementSymbol} and atomic number ${elementAtomicNumber}. Because boron is produced entirely by cosmic ray spallation and not by stellar nucleosynthesis it is a low-abundance element in both the Solar system and the Earth's crust.[12] Boron is concentrated on Earth by the water-solubility of its more common naturally occurring compounds, the borate minerals. These are mined industrially as evaporites, such as borax and kernite. The largest proven boron deposits are in Turkey, which is also the largest producer of boron minerals.</p>
          <p><a href="/">back</a></p>
        </body>
        </html>`;

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'success': true
        });

        fs.writeFile(newFileName, newFileBody, (err) => {
          if (err) {
            console.log('New file creation has failed');
          };
          console.log('New file has been created!');
        });



        res.end('post finished');
      });
    }
    else {
      console.log('Only a ./elements file can be requested');
    }
  }

  else if (req.method === 'GET') {


    req.on('end', () => {
      console.log('GET')

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
  }

  else {
    console.log('neither GET or POST');
  }

});

server.listen(PORT, () => {
  console.log('server is listening on port', PORT);
});