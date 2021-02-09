"use strict";
// Return a list of files of the specified fileTypes in the provided dir,
// with the file path relative to the given dir
// dir: path of the directory you want to search the files for
// fileTypes: array of file types you are search files, ex: ['.txt', '.jpg']
exports.__esModule = true;
exports.joinSchema = exports.getFilesFromDir = void 0;
var fs = require("fs");
var path = require("path");
var getFilesFromDir = function (dir, fileTypes) {
    var filesToReturn = [];
    function walkDir(currentPath) {
        var files = fs.readdirSync(currentPath);
        for (var i in files) {
            var curFile = path.join(currentPath, files[i]);
            if (fs.statSync(curFile).isFile() &&
                fileTypes.indexOf(path.extname(curFile)) != -1) {
                if (!curFile.endsWith('.d.ts')) {
                    // filesToReturn.push(curFile.replace(dir, ''));
                    filesToReturn.push(curFile);
                }
            }
            else if (fs.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            }
        }
    }
    walkDir(dir);
    return filesToReturn;
};
exports.getFilesFromDir = getFilesFromDir;
var joinSchema = function (p, dir) {
    return path.join(dir !== null && dir !== void 0 ? dir : __dirname, 'schema', p, '*.graphql');
};
exports.joinSchema = joinSchema;
