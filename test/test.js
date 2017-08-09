var fs = require('fs');
var dir = require('node-dir');
var mkdirp = require('mkdirp');
var path = require('path');
var crypto = require('crypto');
var EventEmitter = require('events');

var emitter = new EventEmitter();

emitter.setMaxListeners(25);

function encrypt_it(dirToEncrypt, whereToPutFiles, password) {
  var pathToEncryptedFiles = __dirname;

  dir.files(dirToEncrypt, function(err, files){


    query = ["node_modules"];

    files = files.filter(function(el) {
      return el.indexOf(query) === -1;
    });

    files.forEach(function(item){
      var basename = "\\" + path.basename(item);

      var dirToCreate = path.dirname(item).substr(dirToEncrypt.length);
      fs.stat(pathToEncryptedFiles+ "\\encryptedFiles" +dirToCreate, function (err, stats){
        if (err) {
          // Directory doesn't exist or something.
          mkdirp.sync(pathToEncryptedFiles+ "\\encryptedFiles" +dirToCreate, "0777");

          fs.readFile(item, function(err, data){
            var cipher = crypto.createCipher('aes128', "test");
            console.log("data:: ", data);
            var output = pathToEncryptedFiles+ "\\encryptedFiles" + dirToCreate + basename;


            let encrypted = cipher.update(data, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            fs.writeFile(output, encrypted, function(err){
              if (err) throw err;
            });
          });

          // input.on('end', () => {
          //   // do stuff
          //   output.end();
          //   console.log(pathToEncryptedFiles+ "\\encryptedFiles" + dirToCreate + basename);
          // });

        }

      });
    });

  });
}
encrypt_it("C:/Users/A0C6H1/git/node-auth-signup", '', '');
