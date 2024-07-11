const electron = require('electron');
const path = require('path');
const fs = require('fs');
const config = require('./config.json');
const configProd = require('./config.prod.json');

var browser;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

// Create the main window.
const createWindow = () => {
    // Create the browser window.
    browser = new electron.BrowserWindow({
        width: 1270,
        height: 720,
        icon: 'assets/icon.ico',
        webPreferences: {
            nodeIntegration: true,
            preload: `${__dirname}/preload.js`
        }
    });

    // Set Alt-menu to be disabled.
    browser.setMenuBarVisibility(false);
    

    // Listen for navigation events
    browser.webContents.on('will-navigate', (event, url) => {
        // Make sure the URL does start with "file://"
        if (url.startsWith('file://')) {
            let realPath = url.split('file:///')[1].replaceAll('%20', ' ');
            // Check if URL has params in it
            // If so, remove them in the real path. We'll add them later
            let hasParams = realPath.includes('?');
            let params = realPath.split('?')[1];
            if (realPath.includes('?')) {
                realPath = realPath.split('?')[0];
            }
            // Check if the URL is a folder
            if (fs.lstatSync(realPath).isDirectory() !== true && fs.existsSync(realPath)) {
                browser.loadURL(`file://${__dirname}/res/404.html`);
            } else if (fs.lstatSync(realPath).isDirectory() === true && fs.readFile(`${realPath}/index.html`)) {
                browser.loadURL(`file://${realPath}/index.html${hasParams ? `?${params}` : ''}`);
            }
        }
    });

    // ## OG LOAD
    // Load the index.html of the app.
    // browser.loadURL(`file://${__dirname}/index.html`);

    // Loading the site
    /// Check if Electron is running in development or packaged mode.
    let {env} = process; // eslint-disable-line n/prefer-global/process
    let isEnvSet = 'ELECTRON_IS_DEV' in env;
    let getFromEnv = Number.parseInt(env.ELECTRON_IS_DEV, 10) === 1;
    let isDev = isEnvSet ? getFromEnv : !electron.app.isPackaged;
    /// Change which config to use depending on "isDev"
    let configToUse = isDev ? config : configProd;
    /// Load the index.html of the app.
    browser.loadURL(configToUse.URL);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron.app.whenReady().then(() => {
    createWindow();
    
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    electron.app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Close when all windows are closed.
electron.app.on('window-all-closed', () => {
    electron.app.quit();
});
