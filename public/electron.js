const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

function createWindow () {

    const startUrl = process.env.ELECTRON_START_URL 
    || url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    })

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        },
        
    })

    window.loadURL(startUrl)
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.handle('get', async (event, stringInput) => {
    try {
        const readRoute = `${process.env.API_URL}/read-visit/`
        const queryString = stringInput ? `?${stringInput}` : ''
        const route = `${readRoute}${queryString}`

        const resolve = await fetch(route, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const result = await resolve.json()
        console.log(result)
        if(result.Error) throw result.Error
        return {visits: result}
    } catch (err) {
        return {Error: err}
    }
})

ipcMain.handle('post', async (event, visit) => {
    try {
        const createRoute = `${process.env.API_URL}/create-visit/`
        const resolve = await fetch(`${createRoute}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: `{"params": ${JSON.stringify(visit)}}`
        })
        const result = await resolve.json()
        console.log(result)
        if(result.Error) throw result.Error
        return result
    } catch (err) {
        return {Error: err}
    }
})

ipcMain.handle('put', async (event, visit) => {
    try {
        visit = {...visit}
        const id = visit.id
        delete visit.id
    
        const updatedVisit = `{"id": "${id}", "params": ${JSON.stringify(visit)}}`
        
        const updateRoute = `${process.env.API_URL}/update-visit/`
        const resolve = await fetch(`${updateRoute}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: updatedVisit
        })
        const result = await resolve.json()
        console.log(result)
        if(result.Error) throw result.Error
        return result
    } catch (err) {
        return {Error: err}
    }
})

ipcMain.handle('delete', async (event, id) => {
    try {
        const deleteRoute = `${process.env.API_URL}/delete-visit/`
        const resolve = await fetch(`${deleteRoute}`, {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: `{"id": "${id}"}`
        })
        const result = await resolve.json()
        if(result.Error) throw result.Error
        return result
    } catch (err) {
        return {Error: err}
    }
})