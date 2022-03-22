// Allow only two players at a time
let playerCount = 0;

function socketListener(io) {

  const pongSocketServer = io.of('/pong'); // We access the specific socket server made in script.js for pong

  pongSocketServer.on('connection', (socket) =>{
    
    let room;
    console.log('Server connected with id', socket.id);
  
      // This will be checked on client side in script.js
    // When it emits socket.emit('ready') this fn will trigger
    socket.on('ready', () =>{

      // To allow for multiple players we need each set of players to have their own room
    room = 'room' + Math.floor(playerCount/2); // For room 0 -> 0/2 and 1/2
    socket.join(room);

        console.log(`Player ${socket.id} Ready in room ${room}!!`);
        playerCount++;
        if(playerCount % 2 === 0) {
          pongSocketServer.in(room).emit('startGame', socket.id); // This will be a emit which can be detected on client
        }
    });
  
    // detects paddleMove event from client emitter
    socket.on('paddleMove', (paddleData)=>{
        socket.to(room).emit('paddleMove', paddleData);    // This sends to all connected clients except sender
    });
  
    // Detects ballmovements from client emitter
    socket.on('ballMove', (ballData)=>{
        socket.to(room).emit('ballMove', ballData);    // This sends to all connected clients except sender
    });
  
    socket.on('disconnect', (reason) => {
        console.log(`Player ${socket.id} Has Disconnected due to ${reason} !`);
        socket.leave(room);
    });
  });
}

module.exports = {
  socketListener,
}
