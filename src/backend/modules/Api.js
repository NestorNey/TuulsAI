const path = require('path')
const pathsFile = require('../settings/paths.json')
const Renderer = require('./Renderer')
const Themes = require('./Themes')

class TuulsIA{
    Views = []

    constructor(){
        this.Paths = this._getPaths()
        this.Handler = path.join(__dirname, 'Handler.js')
        this.Themes = new Themes()
        this.Renderer = require('./Renderer')
    }

    _getPaths() {
        const paths = {}
        for (const appPath in pathsFile) {
            paths[appPath] = path.join(__dirname, "..", pathsFile[appPath])
        }
        return paths
    }
}

const TuulsIAObject = new TuulsIA()

module.exports = TuulsIAObject
