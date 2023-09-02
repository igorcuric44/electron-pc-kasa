const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
  maximizeMsg:(msg)=>ipcRenderer.send("maximize-message-postavke",msg),
  minimizeMsg:(msg)=>ipcRenderer.send("minimize-message-postavke",msg),
  closeMsg:(msg)=>ipcRenderer.send("close-message-postavke",msg),
}


contextBridge.exposeInMainWorld('poruka',func);

let sqlunos_postavke=(poduzecex,imex,prezimex,adresax,mjestox,oibx,telefonx)=>{
    return new Promise((resolve,reject)=>{

        db.serialize(() => {

        console.log(poduzecex,imex,prezimex,adresax,mjestox,oibx,telefonx);
        db.run(`drop table if exists poduzece`);
        db.run(`create table poduzece (poduzece text not null,ime text not null,prezime text not null,adresa text not null,mjesto text not null,oib text not null,telefon text not null)`);
        
    
    db.run(`INSERT INTO poduzece(poduzece,ime,prezime,adresa,mjesto,oib,telefon) VALUES (?,?,?,?,?,?,?)`, [poduzecex,imex,prezimex,adresax,mjestox,oibx,telefonx], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      resolve(`A row has been inserted with rowid ${this.lastID}`);
    });
    });
})
}
  



    const API={
        sqlunos_postavke:sqlunos_postavke,
        sendMsg:(msg)=>ipcRenderer.send("message-from-window10",msg),
    }
    

    contextBridge.exposeInMainWorld('apipostavke',API);