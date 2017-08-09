const {dialog} = require('electron').remote; // Load remote compnent that contains the dialog dependency
var fs = require('fs');
var dir = require('node-dir');
var mkdirp = require('mkdirp');
var path = require('path');

document.getElementById('select-file').addEventListener('click',function(){
  dialog.showOpenDialog({properties: ['openDirectory']}, function (fileNames) {
    if(fileNames === undefined){
      console.log("No file selected");
    }else{
      document.getElementById("actual-file").value = fileNames[0];

      if(document.getElementById("pathToFiles").value == ""){
        document.getElementById("pathToFiles").value = fileNames[0];
      }
      displayFiles(
        fileNames[0],
        ["node_modules", ".git"]
      );
    }
  });
},false);

document.getElementById('path-file').addEventListener('click',function(){
  dialog.showOpenDialog({properties: ['openDirectory']}, function (fileNames) {
    if(fileNames === undefined){
      console.log("No path selected");
    }else{
      document.getElementById("pathToFiles").value = fileNames[0];
    }
  });
},false);

document.getElementById('encrypt').addEventListener('click',function(){
  if (document.getElementById("encryptionPassword").value == "" || document.getElementById("encryptionPassword").value == null) {
    console.log("Pick a password");
  }else {
    document.getElementById("loader").style.display = "";
    encrypt_it(
      document.getElementById("actual-file").value,
      document.getElementById("pathToFiles").value,
      document.getElementById("encryptionPassword").value
    );
  }
},false);

// let myNotification = new Notification('Title', {
//   body: 'Lorem Ipsum Dolor Sit Amet'
// })
// myNotification.onclick = () => {
//   document.getElementById("content-editor").value = "Ouch";
// }

function displayFiles(path, query) {
  document.getElementById("bubbleLoader").style.display = "";

  var listOfFiles = document.getElementById("filesAfterQuery");
  while (listOfFiles.firstChild) {
      listOfFiles.removeChild(listOfFiles.firstChild);
  }

  dir.files(path, function(err, files){

    files = files.filter(function(el, index) {

      let strikes = 0;

      for (var i = 0; i < query.length; i++) {
        if(el.indexOf(query[i]) !== -1){
          strikes++;
        }
      }

      if (strikes >= 1) {
        return false;
      }else {
        return true;
      }

    });

    function displayFilesCallback() {
      document.getElementById("bubbleLoader").style.display = "none";
    }

    if(files.length >= 5000){
      var h2 = document.createElement('h2');
      h2.textContent = "This is a lot of files!";

      listOfFiles.appendChild(h2);
      displayFilesCallback();
    }else{

      let itemsCreated = 0;

      files.forEach(function(item){
        var li = document.createElement('li');
        var textarea = document.createElement('textarea');
        li.textContent = item;
        li.className = item;
        li.id = item;

        textarea.id = item+"textarea";

        listOfFiles.appendChild(li);
        li.appendChild(textarea);
        itemsCreated++;
        if(itemsCreated == files.length){
          displayFilesCallback();
        }
      });
    }

    $(document).ready(function() {

      $("#filesAfterQuery li").click(function() {
        var path = require('path');

        $("#filesAfterQuery li").removeClass('active');

        // This clears up the perviou active click
        $("#filesAfterQuery textarea").css('display', 'none');
        $("#filesAfterQuery img").css('display', 'none');
        $(".tempHTML").remove();

        listItemClassName = $(this).attr("class");
        listItem = document.getElementById(listItemClassName);

        curPath = path.extname(listItemClassName).toLowerCase();

        if(curPath == ".jpg" || curPath == ".png" || curPath == ".ico"){
          var img = document.createElement('img');
          img.src = listItemClassName;
          listItem.appendChild(img);

        }else if(curPath == ".html"){
          fs.readFile(listItemClassName, function(err, data){
            var div = document.createElement('div');
            div.className = "tempHTML";
            div.innerHTML = data;
            listItem.appendChild(div);
            var elements = div.childNodes;
          });

        }else {

          fs.readFile(listItemClassName, function(err, data){
            document.getElementById(listItemClassName+"textarea").textContent = data;
          });
          $(this).children().css('display', 'inline-block');
        }

        $(this).addClass('active');


      });
    });


  });

}


function encrypt_it(dirToEncrypt, whereToPutFiles, password) {
  var crypto = require('crypto');

  var pathToEncryptedFiles = whereToPutFiles;

  dir.files(dirToEncrypt, function(err, files){


    query = ["node_modules"];

    files = files.filter(function(el) {
      return el.indexOf(query) === -1;
    });

    function forEachCallback() {
      document.getElementById("loader").style.display = "none";
      alert("Finished!");
    }

    let itemsCreated = 0;

    files.forEach(function(item){
      var basename = "\\" + path.basename(item);

      var dirToCreate = path.dirname(item).substr(dirToEncrypt.length);
      fs.stat(pathToEncryptedFiles+ "\\encryptedFiles" +dirToCreate, function (err, stats){
        if (err) {
          // Directory doesn't exist or something.
          mkdirp.sync(pathToEncryptedFiles+ "\\encryptedFiles" +dirToCreate, "0777");

          fs.readFile(item, function(err, data){
            var output = pathToEncryptedFiles+ "\\encryptedFiles" + dirToCreate + basename;

            var cipher = crypto.createCipher('aes192', password);

            let encrypted = cipher.update(data, null, 'hex');
            encrypted += cipher.final('hex');

            fs.writeFile(output, encrypted, function(err){
              if (err) throw err;
              itemsCreated++;
              if(itemsCreated == files.length){
                forEachCallback();
              }
            });

          });

        }

      });
    });

  });
}
