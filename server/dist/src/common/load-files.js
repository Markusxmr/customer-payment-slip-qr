"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinSchema = exports.getFilesFromDir = void 0;
const fs = require("fs");
const path = require("path");
const getFilesFromDir = (dir, fileTypes) => {
    let filesToReturn = [];
    function walkDir(currentPath) {
        let files = fs.readdirSync(currentPath);
        for (let i in files) {
            let curFile = path.join(currentPath, files[i]);
            if (fs.statSync(curFile).isFile() &&
                fileTypes.indexOf(path.extname(curFile)) != -1) {
                if (!curFile.endsWith('.d.ts')) {
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
const joinSchema = (p, dir) => path.join(dir !== null && dir !== void 0 ? dir : __dirname, 'schema', p, '*.graphql');
exports.joinSchema = joinSchema;
//# sourceMappingURL=load-files.js.map