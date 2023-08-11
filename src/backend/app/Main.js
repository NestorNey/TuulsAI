const TuulsIA = require('../modules/Api')
const Render = TuulsIA.Render
const { BrowserWindow, ipcMain } = require('electron')

class Main {
  constructor() {
    this.createMainWindow()
    this.startEvents()
  }

  createMainWindow(){
    TuulsIA.Views.main = new BrowserWindow({
      frame: false,
      backgroundColor: TuulsIA.Themes.Styles.backgroundColor,
      center: true,
      minWidth: 600,
      minHeight: 600,
      webPreferences:{
        nodeIntegration: false,
        contextIsolation: true,
        preload: TuulsIA.Handler
      }
    })

    const Renderer = new TuulsIA.Renderer(TuulsIA)

    TuulsIA.Views.main.loadURL(Renderer.render('main'))
    TuulsIA.Views.main.webContents.openDevTools()
  }

  startEvents(){
    ipcMain.on('openConfig', (event, configPath) => {
      const confObject = require('./Configuration')
      new confObject()
    })
  }
}

module.exports = Main