var fs = require('fs');
var dir = require('node-dir');
var mkdirp = require('mkdirp');
var path = require('path');
var crypto = require('crypto');
var EventEmitter = require('events');

var emitter = new EventEmitter();

emitter.setMaxListeners(25);

var dirToEncrypt = "C:/Users/A0C6H1/git/node-auth-signup";
var dirToEncryptLong = "C:\\Users\\A0C6H1\\git\\node-auth-signup";
var pathToEncryptedFiles = "C:\\Users\\A0C6H1\\git\\Encrypt-It\\test"

dir.files(dirToEncrypt, function(err, files){

  var cipher = crypto.createCipher('aes128', "password");

  query = ["node_modules"];

  files = files.filter(function(el) {
            return el.indexOf(query) === -1;
          })

  files.forEach(function(item){
    var basename = "\\" + path.basename(item);

    var dirToCreate = path.dirname(item).substr(dirToEncrypt.length);
    fs.stat(pathToEncryptedFiles+ "\\encryptedFiles" +dirToCreate, function (err, stats){
      if (err) {
        // Directory doesn't exist or something.
        mkdirp.sync(pathToEncryptedFiles+ "\\encryptedFiles" +dirToCreate, "0777");

        var input = fs.createReadStream(item);
        var output = fs.createWriteStream(pathToEncryptedFiles+ "\\encryptedFiles" + dirToCreate + basename);
        input.pipe(cipher).pipe(output);

      }

    });
  });

});
