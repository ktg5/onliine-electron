const fs = require('fs-extra');
const Zip = require('adm-zip');
const packagejson = require('./package.json');


// Win32 build
let win32Build = `out/make/zip/win32/x64/onliine-win32-x64-${ packagejson.version }.zip`;
if (fs.existsSync(win32Build)) {
    console.log(`Win32 zip was found, unzipping...`);
    let zip = new Zip(win32Build);
    zip.extractAllTo('onliine-win32-x64');
    console.log(`Unzipped ${win32Build} to onliine-win32-x64`);
}