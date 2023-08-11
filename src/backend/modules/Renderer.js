const { ipcMain } = require('electron')
const path = require('path')

class Renderer{
    scriptPaths = []

    constructor(TuulsIA){
        this.TuulsIA = TuulsIA
    }

    render(view){
        const Path = path.join(this.TuulsIA.Paths.views, (view + '.html'))
        const viewName = view
        this._preloadFrontendRender(viewName)
        this._startRenderEvent(viewName)

        return Path
    }

    _renderContent(htmlContent){
        this.scriptPaths = []
        const contentRendered = {}

        const variableRegex = /\{\{\s*(\w+)\s*:\s*'([^']+)'\s*\}\}/g
        const modifiedHtmlContent = htmlContent.replace(variableRegex, (match, varName, varValue) => {
            return this._replaceVariables(match, varName, varValue)
        })

        contentRendered.innerHtml = modifiedHtmlContent
        contentRendered.scriptPaths = this.scriptPaths

        return contentRendered
    }
    
    _replaceVariables(match, varName, varValue) {
        switch (varName) {
            case 'css':
                return path.join(this.TuulsIA.Paths.css, varValue);
            case 'icon':
                return path.join(this.TuulsIA.Paths.themes, this.TuulsIA.Themes.Styles.themeId, 'icon', varValue);
            case 'script':
                this.scriptPaths.push(path.join(this.TuulsIA.Paths.js, varValue))
                return path.join(this.TuulsIA.Paths.js, varValue);
            case 'media':
                return path.join(this.TuulsIA.Paths.themes, this.TuulsIA.Themes.Styles.themeId, 'media', varValue);
            default:
                return match;
        }
    }

    _startRenderEvent(viewName) {
        ipcMain.on('render', (event, content) => {
            const contentRendered = this._renderContent(content);
            this.TuulsIA.Views[viewName].webContents.send('contentRendered', contentRendered);
          });
    }

    _preloadFrontendRender(viewName){
        this.TuulsIA.Views[viewName].webContents.on('did-finish-load', () => {
        this.TuulsIA.Views[viewName].webContents.executeJavaScript(`
        try{
            window.package.send('render', document.documentElement.innerHTML, 'primerScript');

            window.package.receive('contentRendered', (contentRendered) => {
                document.documentElement.innerHTML = contentRendered.innerHtml

                const scripts = document.querySelectorAll('script')
                scripts.forEach((script) => { 
                  script.remove()
                });
                for(path in contentRendered.scriptPaths){
                  const script = document.createElement('script')
                  script.src = contentRendered.scriptPaths[path]
                  document.body.appendChild(script)
                }
                if (!localStorage.getItem('isPageReloaded')) {
                    localStorage.setItem('isPageReloaded', 'true');
      
                    location.reload();
                } else {
                    localStorage.removeItem('isPageReloaded');
                } 
                
            });
        }catch(e){
            console.log(e)
        }
          `);
        });
    }
}

module.exports = Renderer