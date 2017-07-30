var fs = require('fs');
var dir = require('node-dir');
var mkdirp = require('mkdirp');
var path = require('path');
var crypto = require('crypto');

mkdirp(__dirname+'/pls/help/me/someone.txt', function (err) {
    if (err) console.error(err)
    else console.log('pow!')
});
// var dirToEncrypt = "C:\\Users\\oman5\\Desktop\\git\\node-auth-signup\\app";
// console.log(dirToEncrypt.length);
// dir.files("C:\\Users\\oman5\\Desktop\\git\\node-auth-signup\\app", function(err, files){
//   for (var i = 0; i < files.length; i++) {
// console.log(files[i]);
//   }
//   const cipher = crypto.createCipher('aes128', "password");
//   for (var i = 0; i < files.length; i++) {
//
//     const input = fs.createReadStream(files[i]);
//     mkdirp(__dirname+'/pls/help/me/someone.txt', function (err) {
//         if (err) console.error(err)
//         else console.log('pow!')
//         const output = fs.createWriteStream("C:\\Users\\oman5\\Desktop\\git\\Encrypt It\\pls\\help\\me\\" + path.basename(files[i]));
//         input.pipe(cipher).pipe(output);
//         console.log("Created:: "+path.basename(files[i]));
//     });
//
//   }
// });
