const io = require('socket.io');
const logger = require('./logger')('socket');

const questions = [];
const sockets = [];

function emitAll(type, payload) {
  sockets.map((sck) => sck.emit(type, payload));
}

function conn(sck) {
  logger(`${sck.id} connected`);

  // update the list of websocket clients
  sockets.push(sck);
  logger(`${sockets.length} total sockets connected`);

  // because someone's connected, update them with all of the questions
  sck.emit('question', questions);

  // respond to pings
  sck.on('keepalive', () => logger(`${sck.id} pinged`));

  // add an event listener for a question
  // on a question, update the total list
  // and emit the question to all clients.
  sck.on('question', (data) => {
    logger('Question GET');
    questions.push(data);
    emitAll('question', [data]);
  });

  sck.on('disconnect', (reason) => {
    const index = sockets.indexOf(sck);
    if (index !== -1) sockets.splice(index, 1);
    logger(`${sck.id} disconnected.`);
    logger(`${sockets.length} sockets remain`);
  });
}

function init(server) {
  // initialise the server
  const sock = io(server);
  // add event listeners
  sock.on('connection', conn);
}

module.exports = {init};
