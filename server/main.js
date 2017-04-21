import { Meteor } from 'meteor/meteor';
var shell = require('shelljs');
var mkdirp = require('mkdirp');
var fs = require('fs');
var zlib = require('zlib');
var mv = require('mv');
var cp = require('cp');
var getDirName = require('path').dirname;

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

Meteor.startup(() => {

	UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true, //create the directories for you
  });
	
  // code to run on server at startup
  Meteor.methods({
  	encryptIt: function(fileInfo, username, password) {
  		console.log("hello from sevrer");
  		var fileName= fileInfo.name;
      let dir = "/home/stuartabhi/Documents/test/testproject/.uploads/"+username; 
      let dirDecrypt = "/home/stuartabhi/Documents/test/testproject/.uploads/"+username+"/decrypted"; 
  		
    let path = "/home/stuartabhi/Documents/test/testproject/.uploads/"+username+"/decrypted/"+fileName;
    if (!fs.existsSync(dir)){
  		    fs.mkdirSync(dir);
  		}
      if (!fs.existsSync(dirDecrypt)){
          fs.mkdirSync(dirDecrypt);
      }
 
      mv("/home/stuartabhi/Documents/test/testproject/.uploads/"+fileName, "/home/stuartabhi/Documents/test/testproject/.uploads/"+username+"/decrypted/"+fileName, function(err) {
      // done. it tried fs.rename first, and then falls back to 
  // piping the source file to the dest file and then unlinking 
  // the source file.

			// input file5
			var r = fs.createReadStream(path);

			// zip content
			var zip = zlib.createGzip();
			// encrypt content
			var encrypt = crypto.createCipher(algorithm, 'password');
			// write file
			var wenc = fs.createWriteStream(dir+"/"+fileName);

			// start pipe
			r.pipe(zip).pipe(encrypt).pipe(wenc).on('finish', function () {
			  	console.log("encrypted");

				  }); 
});
  	},
   'file-list': function(username){
   		console.log(username);
    	let list = shell.ls("/home/stuartabhi/Documents/test/testproject/.uploads/"+username+'/decrypted/')
    	return(list.stdout);
     },
     'decryptit': function(username, fileName, password){
      console.log("decrypting");
      let dir = "/home/stuartabhi/Documents/test/testproject/.uploads/"+username+"/decrypted"; 
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      var renc = fs.createReadStream("/home/stuartabhi/Documents/test/testproject/.uploads/"+username+"/decrypted/"+fileName);
      // decrypt content
      var decrypt = crypto.createDecipher(algorithm, 'password')
      // unzip content
      var unzip = zlib.createGunzip();
      // write file
      var w = fs.createWriteStream("/home/stuartabhi/Documents/test/testproject/.uploads/"+username+"/decrypted/"+fileName);

      //renc.pipe(decrypt).pipe(unzip).on('finish', function () {
          //fs.unlink('/home/stuartabhi/Documents/test/testproject/.uploads/file.enc');
          console.log('decrypted');
        //});
     },
     'shareFile': function(fileName, username1, username2){
      console.log(username1);
        cp("/home/stuartabhi/Documents/test/testproject/.uploads/"+username1+"/decrypted/"+fileName,
          "/home/stuartabhi/Documents/test/testproject/.uploads/"+username2+"/decrypted/"+fileName,
          function(err){console.log("Copied")})
     }

  });
});
