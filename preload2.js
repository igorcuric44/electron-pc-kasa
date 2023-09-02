const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
  maximizeMsg:(msg)=>ipcRenderer.send("maximize-message-unos",msg),
  minimizeMsg:(msg)=>ipcRenderer.send("minimize-message-unos",msg),
  closeMsg:(msg)=>ipcRenderer.send("close-message-unos",msg),
}


contextBridge.exposeInMainWorld('poruka',func);



let sqlunos=(id,artikl,pdv,kolicina,mjera,cijena)=>{
    return new Promise((resolve,reject)=>{

        console.log(id,artikl,pdv,kolicina,mjera,cijena);
    
    db.run(`INSERT INTO skladiste (Id,Artikl,Pdv,Kolicina,Mjera,Cijena) VALUES (?,?,?,?,?,?)`, [id,artikl,pdv,kolicina,mjera,cijena], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      resolve(`A row has been inserted with rowid ${this.lastID}`);
    });
})
}
  

    const API={
        sqlunos:sqlunos,
        sendMsg:(msg)=>ipcRenderer.send("message-from-window2",msg),
    }
    

    contextBridge.exposeInMainWorld('apiunos',API);

    