console.clear();
const ClickHash = require('src/clickhash');
const Recognition = require('src/recognition');
const commands = require('src/commands');
const Command = require('src/command');
const listener = require('src/listener');








listener.init();

// for testing
[].forEach.call(document.querySelectorAll('a'), (el)=>{
	el.addEventListener('click', (evt)=>{
  	alert(`you clicked ${evt.target.innerText}`);
  });
});

document.querySelector('button').addEventListener('click', (evt)=>{
alert('clicked');
});

