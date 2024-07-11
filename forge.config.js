const fs = require('fs');
console.log('x64 folder: ', fs.readdirSync('out/make/zip/win32/x64'));
console.log('win32 folder: ', fs.readdirSync('out/make/zip/win32'));
console.log('zip folder: ', fs.readdirSync('out/make/zip'));

module.exports = {
    packagerConfig: {
        icon: "assets/icon",
        ignore: [
            ".gitignore",
            ".github"
        ]
    },
    makers: [
        {
            name: '@electron-forge/maker-zip'
        }
    ]
};