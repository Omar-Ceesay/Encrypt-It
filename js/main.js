const remote = require("electron").remote;
const main = remote.require('./index.js');

var button = document.createElement('button');
var history = document.createElement('button');

button.textContent = "Open Window";
button.addEventListener('click', () => {
  var window = remote.getCurrentWindow();
  main.openWindow("../views/page.html");
  window.close(); // Should come after openWindow()
}, false);

document.body.appendChild(button);
