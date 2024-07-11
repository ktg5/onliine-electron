module.exports = {
    packagerConfig: {
        icon: "assets/icon",
        ignore: [
            ".gitignore",
            ".github",
            "node_modules",
        ]
    },
    makers: [
        {
            name: '@electron-forge/maker-zip'
        }
    ]
};