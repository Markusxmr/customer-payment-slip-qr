// Return a list of files of the specified fileTypes in the provided dir,
// with the file path relative to the given dir
// dir: path of the directory you want to search the files for
// fileTypes: array of file types you are search files, ex: ['.txt', '.jpg']

import * as fs from 'fs';
import * as path from 'path';

export const getFilesFromDir = (dir, fileTypes): string[] => {
  let filesToReturn = [];
  function walkDir(currentPath) {
    let files = fs.readdirSync(currentPath);
    for (let i in files) {
      let curFile = path.join(currentPath, files[i]);

      if (
        fs.statSync(curFile).isFile() &&
        fileTypes.indexOf(path.extname(curFile)) != -1
      ) {
        if (!curFile.endsWith('.d.ts')) {
          // filesToReturn.push(curFile.replace(dir, ''));
          filesToReturn.push(curFile);
        }
      } else if (fs.statSync(curFile).isDirectory()) {
        walkDir(curFile);
      }
    }
  }

  walkDir(dir);

  return filesToReturn;
};

export const joinSchema = (p: string, dir?: string) =>
  path.join(dir ?? __dirname, 'schema', p, '*.graphql');
