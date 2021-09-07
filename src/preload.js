const {contextBridge, ipcRenderer } = require('electron')
const { readFileSync, writeFileSync } = require('fs')
const path = require('path')
const homedir = require('os').homedir();

contextBridge.exposeInMainWorld('electron', {
    startDrag: (fileName) => {
        ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
    },
    saveConfig: (info) => {
        try{
            const filePath = path.join(homedir, 'Desktop', 'config_crewroom.json');
            writeFileSync(filePath, JSON.stringify(info), 'utf8');
            return { status: true, data: 'success' }
        }catch(error){
            return { status: false, data: error }
        }
    },
    readConfig: () => {
        try{
            const filePath = path.join(homedir, 'Desktop', 'config_crewroom.json');
            const data = readFileSync(filePath, 'utf-8')
            return data
        }catch(err){
            return null
        }
    }
})