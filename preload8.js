const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
  maximizeMsg:(msg)=>ipcRenderer.send("maximize-message-cijene",msg),
  minimizeMsg:(msg)=>ipcRenderer.send("minimize-message-cijene",msg),
  closeMsg:(msg)=>ipcRenderer.send("close-message-cijene",msg),
}


contextBridge.exposeInMainWorld('poruka',func);

let sqlupdate_cijena=(cijena,sifra)=>{
    return new Promise((resolve,reject)=>{
    console.log(cijena,sifra);

    db.run(`update skladiste set cijena=? where id=?`, [cijena,sifra], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
        console.log(cijena);
        resolve(`A row has been inserted with rowid ${this.lastID}`);
      
    });
  })
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector("#zatvori").addEventListener("click",closeWindow);
    
  async function closeWindow(){
            let cijenax=parseFloat(document.querySelector("#cijena").value);
            let sifrax=parseInt(document.querySelector("#sifra").value);

            console.log(cijenax," ",sifrax)
            console.log("Promijena cijene console")

            let px=await sqlupdate_cijena(cijenax,sifrax);
            console.log(px);

            //ipcRenderer.send('message-from-window8','Zatvori cijena prozor');
        }
});