const {contextBridge, ipcRenderer} = require('electron')

const backendChanels = [
    'sendMessage',
    'render',
    'openConfig'
]
const frontendChanels = [
    'gptResponse',
    'contentRendered'
]

contextBridge.exposeInMainWorld(
    "package", {
        send: (channel, ...data) => {
            if (backendChanels.includes(channel)) {
                ipcRenderer.send(channel, ...data)
            }
        },
        receive: (channel, func) => {
            if (frontendChanels.includes(channel)) {
                 ipcRenderer.on(channel, (event, ...args) => func(...args))
            }
        }
    }
)