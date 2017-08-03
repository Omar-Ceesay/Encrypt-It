const electron = require("electron");
const {app, BrowserWindow, Menu, Tray} = electron;
const path = require('path');

require('events').EventEmitter.prototype._maxListeners = 100;

module.paths.push(path.resolve('node_modules'));
module.paths.push(path.resolve('../node_modules'));
module.paths.push(path.resolve(__dirname, '..', '..', '..', '..', 'resources', 'app', 'node_modules'));
module.paths.push(path.resolve(__dirname, '..', '..', '..', '..', 'resources', 'app.asar', 'node_modules'));

const mainParams = {
  width: 1000,
  height: 800,
  icon : "favicon.ico"
}

app.on("ready", () => {
  let win = new BrowserWindow(mainParams);

  win.loadURL(`file://${__dirname}/index.html`);

  win.webContents.executeJavaScript(`
    var path = require('path');
    module.paths.push(path.resolve('node_modules'));
    module.paths.push(path.resolve('../node_modules'));
    module.paths.push(path.resolve(__dirname, '..', '..', 'electron', 'node_modules'));
    module.paths.push(path.resolve(__dirname, '..', '..', 'electron.asar', 'node_modules'));
    module.paths.push(path.resolve(__dirname, '..', '..', 'app', 'node_modules'));
    module.paths.push(path.resolve(__dirname, '..', '..', 'app.asar', 'node_modules'));
    path = undefined;
  `);

  let tray = null

  tray = new Tray('favicon.ico')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('Encrypt-It!')
  tray.setContextMenu(contextMenu)
})

exports.openWindow = (filename) => {
  let win = new BrowserWindow(mainParams);
  win.loadURL(`file://${__dirname}/views/${filename}`);
}
