const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    get: async (stringInput) => {
      try {
        const response = await ipcRenderer.invoke("get", stringInput)
        if(response.visits) return {visits: response.visits}
        if(response.Error) throw response.Error
      } catch (err) {
        return {Error: err}
      }
    },
    post: async (visit) => {
      try {
        const response = await ipcRenderer.invoke("post", visit)
        if(response.Error) throw response.Error
        return response
      } catch (err) {
        return {Error: err}
      }
    },
    put: async (visit) => {
      try {
        const response = await ipcRenderer.invoke("put", visit)
        if(response.Error) throw response.Error
        return response
      } catch (err) {
        return {Error: err}
      }
    },
    delete: async (id) => {
      try {
        const response = await ipcRenderer.invoke("delete", id)
        if(response.Error) throw response.Error
        return response
      } catch (err) {
        return {Error: err}
      }
    },
  }
)