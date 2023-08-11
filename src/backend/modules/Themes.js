const path = require('path')
const fs = require('fs')
const themesFile = require('../settings/themes.json')

class Themes {
    constructor(){
        this.Styles = this._getStyles(themesFile.theme)
    }

    _getStyles(theme) {
        return themesFile[theme] || {}
    }

    changeTheme(id) {
        if (themesFile.hasOwnProperty(id)) {
            gpttk.styles = getStyles(id)
            themesFile.theme = id
            const dataToSave = JSON.stringify(themesFile, null, 4)
            fs.writeFileSync(path.join(__dirname, '../settings/themes.json'), dataToSave, 'utf8')
        } else {
            console.log(`El tema "${id}" no existe en el archivo JSON.`)
        }
    }
}

module.exports = Themes