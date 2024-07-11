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