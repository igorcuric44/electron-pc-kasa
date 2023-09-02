const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
  maximizeMsg:(msg)=>ipcRenderer.send("maximize-message-sifre",msg),
  minimizeMsg:(msg)=>ipcRenderer.send("minimize-message-sifre",msg),
  closeMsg:(msg)=>ipcRenderer.send("close-message-sifre",msg),
}


contextBridge.exposeInMainWorld('poruka',func);

let sqlsifre=(id,artikl,id1,mjera1,cijena1,pdv1,id2,mjera2,cijena2,pdv2)=>{
    return new Promise((resolve,reject)=>{

        console.log(id,artikl,id1,mjera1,pdv1,cijena1,id2,mjera2,pdv2,cijena2);
    
    db.run(`INSERT INTO sifrarnik (id,artikl,id1,mjera1,cijena1,pdv1,id2,mjera2,cijena2,pdv2) VALUES (?,?,?,?,?,?,?,?,?,?)`, [id,artikl,id1,mjera1,cijena1,pdv1,id2,mjera2,cijena2,pdv2], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      resolve(`A row has been inserted with rowid ${this.lastID}`);
    });
})
}
  

    const API={
        sqlsifre:sqlsifre,
        sendMsg:(msg)=>ipcRenderer.send("message-from-window4",msg),
    }
    

    contextBridge.exposeInMainWorld('apisifre',API);