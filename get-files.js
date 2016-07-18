function isImage(filename) {
	return name.toLowerCase.endsWith('jpg');
}

function isDirectory(filename) {
	var stat = fs.statSync(filename);
	return stat.isDirectory();
}

function getFiles(path) {
	console.log("start");
	console.log("path="+path);
	var files = fs.readdirSync(path ? path : ".");
	var imageFiles = files.filter(isImage);
	var dirFiles = files.filter(isDirectory).map(getFiles);
	var allFiles = [].concat.apply([],imageFiles);
	allFiles.concat(dirFiles);
	return allFiles;
}

(function(){getFiles(process.argv.slice(2))})();
