import {getStatic} from '../../../sources.js';
const {app} = require("electron");
const con = require('electron').remote.getGlobal('console')
con.log('This will be output to the main process console.')

document.getElementById("close").addEventListener("click", e =>{
    document.getElementById("close").textContent = "asdd";
    app.quit();
});