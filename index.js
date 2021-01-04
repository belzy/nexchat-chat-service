const express = require('express');
const server  = express();
const cors    = require('cors');
const http    = require('http').createServer(server);
const io      = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});
const PORT    = process.env.PORT || 8080;

server.get('/', (req, res) => {
  res.send('Hello World');
});

io.on('connection', socket => {
  socket.on('message', msg => {
    console.log(msg);
    io.emit('message', msg);
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on port ${ PORT }...`);
});