const http = require('http');
const socketio = require('socket.io');

const expressServer = require('./api');
const sockets = require('./sockets');

const server = http.createServer(expressServer);
const io = socketio(server, {
    cors: true,
    origin: process.env.SOCKET_API_URL,
    allowEIO3: true, // tweaking it may help
  });

const PORT = process.env.PORT || 3000;

server.listen(PORT);
console.log(`Listening on port ${PORT}`);

sockets.socketListener(io);