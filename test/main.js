const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var encrypt = function (file, password){
  const cipher = crypto.createCipher('aes192', password);

  extOfFile = path.extname(file);

  const input = fs.createReadStream(file);
  const output = fs.createWriteStream(path.basename(file, extOfFile) + '.enc');

  input.pipe(cipher).pipe(output);
  console.log("Created:: "+path.basename(file, extOfFile) + '.enc');
}

var decrypt = function(file, ext, password){
  const decipher = crypto.createDecipher('aes192', password);

  extOfFile = path.extname(file);

  const input2 = fs.createReadStream(file);
  const output2 = fs.createWriteStream(path.basename(file, extOfFile) +"."+ ext);

  try{
    input2.pipe(decipher).pipe(output2);

  }catch(e){
    console.log("ERROR:: Something went wrong");
  }
  console.log("Created:: "+path.basename(file, extOfFile) +"."+ext);
}


rl.question('Encrypt(1) or decrypt(2)? \n', (answer) => {
  if (answer == 1 || answer == "encrypt") {
    rl.question('What\s the filename? \n', (answer2) => {
      rl.question('What\s the password for this encryption? \n', (answer3) => {
        encrypt(answer2, answer3);

        rl.close();
      });

    });
  }else if(answer == 2 || answer == "decrypt"){
    rl.question('What\s the filename? \n', (answer2) => {
      rl.question('What\s should be the extension of the file? \n', (answer3) => {
        var checkIfExtHasDot = answer3;
        rl.question('What\s the password for the decryption? \n', (answer4) => {

          if(answer3.charAt(0) == "."){

            checkIfExtHasDot = checkIfExtHasDot.substr(1);
            decrypt(answer2, checkIfExtHasDot, answer4);
          }else{

            decrypt(answer2, checkIfExtHasDot, answer4);
          }
          rl.close();
        });

      });
    });
  }

});
