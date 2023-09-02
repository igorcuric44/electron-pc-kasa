const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
  maximizeMsg:(msg)=>ipcRenderer.send("maximize-message-brisanje",msg),
  minimizeMsg:(msg)=>ipcRenderer.send("minimize-message-brisanje",msg),
  closeMsg:(msg)=>ipcRenderer.send("close-message-brisanje",msg),
}


contextBridge.exposeInMainWorld('poruka',func);

let sqldelete=(sifra)=>{
    return new Promise((resolve,reject)=>{

    console.log(sifra);
    db.run(`delete from skladiste where id=?`, [sifra], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
        resolve(`A row has been inserted with rowid ${this.lastID}`);
      
    });    
   
}) };


const API={
    sendMsg:(msg)=>ipcRenderer.send("message-from-window7",msg),
    sqldelete:sqldelete,
}

contextBridge.exposeInMainWorld('apibrisanje',API);



