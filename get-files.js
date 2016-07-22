var fs = require('fs');

function isAny(filename) {
	return true;
}
function isImage(filename) {
	return filename.toLowerCase().endsWith('jpg');
}

function isDirectory(filename) {
	console.log("Is directory '" + filename + "'?");
	var stat = fs.statSync(filename);
	return stat.isDirectory();
}

function getFiles(path) {
	console.log("start");
	console.log("path='"+path+"'");
	if (!path) {
		console.log('path must be specified!');
		return;
	}
	var files = fs.readdirSync(path+"").map(function(fname) { return path + '/' + fname;});
	console.log('files in ' + path + ':' + files.length);
	// var imageFiles = files.filter(isImage);
	var imageFiles = files.filter(isAny);
	console.log('image files in ' + path + ':' + imageFiles.length);
	var dirFiles = files
		.filter(isDirectory)
		.map(getFiles);
	console.log('dirFiles files in ' + path + ':' + dirFiles.length);
	var allFiles = [].concat.apply([],imageFiles);
	allFiles = allFiles.concat(dirFiles);
	return allFiles;
}

(function(){
	var files = getFiles(process.argv.slice(2));
	console.log('Files found: ' + files.length);
	console.log(files);
})();
