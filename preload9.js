const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
  maximizeMsg:(msg)=>ipcRenderer.send("maximize-message-djelatnici",msg),
  minimizeMsg:(msg)=>ipcRenderer.send("minimize-message-djelatnici",msg),
  closeMsg:(msg)=>ipcRenderer.send("close-message-djelatnici",msg),
}


contextBridge.exposeInMainWorld('poruka',func);


let sqlunos_djelatnici=(idx,oibx,imex,prezimex,zaporkax)=>{
    return new Promise((resolve,reject)=>{

        console.log(idx,oibx,imex,prezimex,zaporkax);
    
    db.run(`INSERT INTO djelatnici (id_djelatnik,ime,prezime,oib,zaporka) VALUES (?,?,?,?,?)`, [idx,oibx,imex,prezimex,zaporkax], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      resolve(`A row has been inserted with rowid ${this.lastID}`);
    });
})
}
  


    const API={
        sqlunos_djelatnici:sqlunos_djelatnici,
        sendMsg:(msg)=>ipcRenderer.send("message-from-window9",msg),
    }
    

    contextBridge.exposeInMainWorld('apidjelatnici',API);

    