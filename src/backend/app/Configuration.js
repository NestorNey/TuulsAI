const TuulsIA = require('../modules/Api')
const { BrowserWindow, ipcMain } = require('electron')

class ConfigurationWindow{
    constructor(){
        this.configureWindow()
    }

    configureWindow(){
        TuulsIA.Views.configuration = new BrowserWindow({
            parent: TuulsIA.Views.main,  
            modal: true,         
        });
            
        // Carga el archivo HTML de la ventana de 
        let Renderer = new TuulsIA.Renderer(TuulsIA)
        TuulsIA.Views.configuration.loadURL(Renderer.render('configuration'));
            
            // Evento para cerrar la ventana de configuración
        TuulsIA.Views.configuration.on('closed', () => {
            TuulsIA.Views.configuration = null;
            Renderer = null
        });
    }
}

module.exports = ConfigurationWindow