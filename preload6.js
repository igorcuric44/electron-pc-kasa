const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
  maximizeMsg:(msg)=>ipcRenderer.send("maximize-message-skladisnica",msg),
  minimizeMsg:(msg)=>ipcRenderer.send("minimize-message-skladisnica",msg),
  closeMsg:(msg)=>ipcRenderer.send("close-message-skladisnica",msg),
}


contextBridge.exposeInMainWorld('poruka',func);

let sqlupdate=(kolicina,sifra)=>{
    return new Promise((resolve,reject)=>{

        console.log(kolicina,sifra);
//db.serialize(() => {
  var kolicinax=kolicina;
  db.each(`select kolicina from skladiste where id=?`, [sifra], function(err,row) {
    if (err) {
      return console.log(err.message);
    }
    console.log('kolicina/////',row['kolicina']);
    kolicinax=kolicinax+row['kolicina'];
    db.run(`update skladiste set kolicina=? where id=?`, [kolicinax,sifra], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
        console.log(kolicinax);
        resolve(`A row has been inserted with rowid ${this.lastID}`);
      
    });
  //})
    
   
})

    })
}

window.addEventListener('DOMContentLoaded', () => {
   
   // document.getElementById('xx').onclick=function (){myCreateFunction()};
      
   document.querySelector("#zatvori").addEventListener("click",closeWindow);

       async function closeWindow(){
            let kolicinax=parseFloat(document.querySelector("#kolicina").value);
            let sifrax=parseInt(document.querySelector("#sifra").value);

            console.log(kolicinax," ",sifrax)


            console.log("Skladisnica console")
            //window.apiunos.sqlunos(idx,artiklx,pdvx,kolicinax,mjerax,cijenax);
            //window.apiunos.sendMsg("pong unos");

            let px=await sqlupdate(kolicinax,sifrax);

            console.log(px);

            //ipcRenderer.send('message-from-window6','Zatvori skladisnica prozor');
        }

    
});