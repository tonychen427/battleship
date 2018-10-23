
const express = require('express');

const PORT = '9000';

const server = express();
server.use(express.static('dist'));

server.listen(PORT, () => {
  console.log(`Listen on port #: ${PORT}`);
});
