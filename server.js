const http = require('http');
const PORT = process.env.PORT || 1234;

const server = http.createServer( (req, res) => {

  res.write('Response from server\n');
  res.end();
});

server.listen(PORT, () => {
  console.log('server is listening on port', PORT);
});