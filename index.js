const electron = require('electron');
const url = require('url');
const path= require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

// Keep a reference for dev mode
const dev = ( process.defaultApp 
    || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) 
    || /[\\/]electron[\\/]/.test(process.execPath));

function createWindow( ){
    // create new window
    mainWindow = new BrowserWindow({
        width: 1024, height: 768, show: false
    });
    
    let indexPath;
    if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
        // dev
        indexPath = url.format({
            protocol: 'http:',
            host: 'localhost:4000',
            pathname: '/',
            slashes: true
        });
    } else {
        // prod
        indexPath = url.format({
            protocol: 'file:',
            pathname: path.join(__dirname, 'dist', 'index.html'),
            slashes: true
        });
    }
    // Load html into window
    mainWindow.loadURL(indexPath);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        // Open the DevTools automatically if developing
        if ( dev ) {
            mainWindow.webContents.openDevTools();
        }
    });

    // Quit app when closed: mainWindow가 닫히면 하위 window들도 닫힘
    mainWindow.on('closed', function(){
        mainWindow = null;
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu( mainMenu );    // Insert menu
}

// Listen for app to be ready
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});






// Handle create add window
function createAddWindow(){
    // create new window
    addWindow = new BrowserWindow({
        title: 'Add Shopping List Item',
        width: 400,
        height: 200
    });
    // Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,'public','addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbae collection handle
    addWindow.on('close', function(){
        addWindow = null;
    });
}

// Catch Item:add
ipcMain.on('item:add', function(e, item){
    console.log(item);
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});

// Create menu template: 상단 메뉴바
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click: function(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
                click: function(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', // 단축키 
                click: function(){
                    app.quit();
                }
            }
        ]
    }
]

// If mac, add empty object to menu
if( process.platform == 'darwin' ){
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if( process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I', // 단축키 
                click: function(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}