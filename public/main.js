const socket = io();
const qlist = document.querySelector('#questions');
const text = document.querySelector('#textarea');
const submit = document.querySelector('#submit');

function sendQuestion(question) {
  socket.emit('question', {question});
}

function keepalive() {
  socket.emit('keepalive', {});
}

function doSomethingWithData(data) {
  const results = data.map(function(x) {
    const li = document.createElement('li');
    li.classList = 'collection-item';
    li.innerHTML = x.question;
    qlist.appendChild(li);
  });
}

socket.on('question', doSomethingWithData);

function send(e) {
  const value = text.value;
  if (value != '' && (e.keyCode == 13 || e.keyCode == undefined)) {
    sendQuestion(value);
    text.value = '';
  }
}

 submit.addEventListener('click', send);
 text.addEventListener('keypress', send);

const thisInterval = window.setInterval(keepalive, 59000);

