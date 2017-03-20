import { Meteor } from 'meteor/meteor';
var mkdirp = require('mkdirp');
var fs = require('fs');
var getDirName = require('path').dirname;
var shell = require('shelljs');

Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true //create the directories for you
  });
});

Meteor.methods({
   'file-upload': function (fileName, fileType, fileData, username) {
   	  console.log(fileName);
   	  let path = "/home/tmess/Downloads/bihari/Betagalaxy/.uploads/"+username+"/"+fileName
	  mkdirp(getDirName(path), function (err) {
	    if (err) console.log(err);
	    else fs.writeFile(path, fileData, new Buffer(fileData, 'binary'));
	  });
   },
   'file-list': function(username){
   		console.log(username);
    	let list = shell.ls("/home/tmess/Downloads/bihari/Betagalaxy/.uploads/"+username)
    	return(list.stdout);
   }
});