var dir = require('node-dir');

var files = dir.files("C:\\Users\\A0C6H1\\git\\Encrypt-It", function(err, files) {

  query = ["node_modules"];

  files = files.filter(function(el) {
    return el.indexOf(query) === -1;
  })
  console.log(files);
});
