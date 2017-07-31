const electron = require("electron");
const {app, BrowserWindow} = electron;

app.on("ready", () => {
  let win = new BrowserWindow({width: 1000, height: 800});

  win.loadURL(`file://${__dirname}/index.html`);
})

exports.openWindow = (filename) => {
  let win = new BrowserWindow({width: 400, height: 300});
  console.log(`file://${__dirname}/${filename}`);
  win.loadURL(`file://${__dirname}/${filename}`);
}
