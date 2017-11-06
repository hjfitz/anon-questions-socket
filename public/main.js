const socket = io();

function sendQuestion(question) {
  socket.emit('question', {question});
}

function doSomethingWithData(data) {

}

socket.on('question', doSomethingWithData);
