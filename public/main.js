const socket = io();
const qlist = document.querySelector('#questions');

function sendQuestion(question) {
  socket.emit('question', {question});
}

function doSomethingWithData(data) {
console.log(data);
const results = data.map(function(x) {
const li = document.createElement('li');
li.classList = 'collection-item';
li.innerHTML = x.question;
qlist.appendChild(li);
  });
}

socket.on('question', doSomethingWithData);


/**
 * phil did this
 */

 const text = document.querySelector('#textarea');
 const submit = document.querySelector('#submit');


 function send(e) {
   const value = text.value;
   if (value != '' && (e.keyCode == 13 || e.keyCode == undefined)) {
     sendQuestion(value);
     text.value = '';
  }
 }

 submit.addEventListener('click', send);
 text.addEventListener('keypress', send);

