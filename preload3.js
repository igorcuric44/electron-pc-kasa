const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
    maximizeMsg:(msg)=>ipcRenderer.send("maximize-message-skladiste",msg),
    minimizeMsg:(msg)=>ipcRenderer.send("minimize-message-skladiste",msg),
    closeMsg:(msg)=>ipcRenderer.send("close-message-skladiste",msg),
  }
  
  
  contextBridge.exposeInMainWorld('poruka',func);
  


var myPromise=()=>{
    return new Promise((resolve,reject)=>{
    let sql = `SELECT * FROM skladiste`;
        db.all(sql, function (err, rows) {
            if(err){
                console.log(err);
            }else{
            resolve(rows);
            }
        }); 
    })
    }
  

    const API={
        sqlwait:myPromise,
        sendMsg:(msg)=>ipcRenderer.send("message-from-window3",msg),
    }
    
    contextBridge.exposeInMainWorld('apiskladiste',API);