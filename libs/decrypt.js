const crypto = require('crypto');
const fs = require("fs");
const {dialog} = require('electron').remote;

var key = "";

function changeAlert(mainMessage, boldMessage, classChanges) {
  mainMessage = mainMessage || "";
  boldMessage = boldMessage || "";

  document.getElementById("messageWarning").style.display = "";
  //Message changes
  document.getElementById("mainWarning").textContent = mainMessage;
  document.getElementById("strongWarning").textContent = boldMessage;
  //Class changes
  if(!classChanges){
    document.getElementById("messageWarning").className = "alert alert-danger";
  }else{
    document.getElementById("messageWarning").className = classChanges;
  }

}

document.getElementById('select-file').addEventListener('click',function(){
  dialog.showOpenDialog(function (fileNames) {
    if(fileNames === undefined){
      console.log("No file selected");
    }else{
      document.getElementById("actual-file").value = fileNames[0];
      decrypt(fileNames[0]);
    }
  });
},false);

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault();
};

document.body.ondrop = (ev) => {
  if(document.getElementById('password').value == ""){
    changeAlert('', 'Pick a password.', "alert alert-warning");
  }else{

    document.getElementById("outputData").value = "";
    document.getElementById("loader").style.display = "";
    decrypt(ev.dataTransfer.files[0].path);
  }

  ev.preventDefault();
};

document.getElementById('password').addEventListener('input', function(){
});

function decrypt(data) {

  function base64_encode(binaryData) {
    // convert binary data to base64 encoded string
    return new Buffer(binaryData).toString('base64');
  }

  var path = require("path");
  var key = document.getElementById('password').value;

  try{
    fs.readFile(data, function(err, fileData){
      const decipher = crypto.createDecipher('aes192', key);
      try{

        document.getElementById("inputData").value = fileData.toString("utf8");
        let unencrypted = decipher.update(fileData.toString("utf8"), "hex", 'utf8');
        unencrypted += decipher.final('utf8');

        if (path.extname(data).toLowerCase() == ".jpg" || path.extname(data) == ".png") {

          var img = document.createElement("img");

          var base64str = base64_encode(unencrypted);
          fs.writeFileSync("./test.jpg", unencrypted);


          // img.src = "data:image/jpg;base64,"+base64str;
          console.log(img.src);
          document.getElementById("test").appendChild(img);
        }

        document.getElementById("loader").style.display = "none";
        document.getElementById("messageWarning").style.display = "none";
        document.getElementById("outputData").value = unencrypted;

      }catch(e){
        document.getElementById("loader").style.display = "none";
        error = {
          badDecrypt: "Error: error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt",
          badInputString: "TypeError: Bad input string",
          wrongBlockLength: "Error: error:0606506D:digital envelope routines:EVP_DecryptFinal_ex:wrong final block length"
        };
        if(e == error.badDecrypt){
          changeAlert('Make sure the password is entered correctly (password is case-sensitive).', 'Incorrect password!');
        }else if(e == error.badInputString || e == error.wrongBlockLength){
          changeAlert("Something is wrong with the file you inputed. Is it even an encrypted file? Maybe it's the wrong encryption type.", "Bad file!");
        }
      }
    });

  }catch(e){
    alert(e);
  }
}

document.getElementById('inputData').addEventListener('input', function(){
  var encryptedData = document.getElementById('inputData').value;
});
