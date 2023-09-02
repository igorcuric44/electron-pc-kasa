const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
  maximizeMsg:(msg)=>ipcRenderer.send("maximize-message",msg),
  minimizeMsg:(msg)=>ipcRenderer.send("minimize-message",msg),
  closeMsg:(msg)=>ipcRenderer.send("close-message",msg),
}


contextBridge.exposeInMainWorld('poruka',func);


const API={
    get_version:(msg)=>ipcRenderer.invoke("get/version",msg),
    get_unos:(msg)=>ipcRenderer.invoke("get/unos",msg),
    get_blagajna:(msg)=>ipcRenderer.invoke("get/blagajna",msg),
    get_sifrarnik:(msg)=>ipcRenderer.invoke("get/sifrarnik",msg),
    get_skladisnica:(msg)=>ipcRenderer.invoke("get/skladisnica",msg),
    get_brisanje:(msg)=>ipcRenderer.invoke("get/brisanje",msg),
    get_cijene:(msg)=>ipcRenderer.invoke("get/cijene",msg),
    get_djelatnici:(msg)=>ipcRenderer.invoke("get/djelatnici",msg),
    get_postavke:(msg)=>ipcRenderer.invoke("get/postavke",msg),
    get_zaporka:(msg)=>ipcRenderer.invoke("get/zaporka",msg),
    get_sifre:(msg)=>ipcRenderer.invoke("get/sifre",msg),

    sendMsg:(msg)=>ipcRenderer.send("get/izlaz",msg),
}

contextBridge.exposeInMainWorld('api',API);


var sqlpoduzece=()=>{
    return new Promise((resolve,reject)=>{
      let sql = `SELECT * FROM poduzece;`;
          db.all(sql,[], function (err, rows) {
              if(err){
                  reject(new Error(
                    "This promise is Rejected..."));
              }else{
              resolve(rows);
              }
          }); 
    })
    }

   
   
   
    window.addEventListener('DOMContentLoaded', () => {
        let pp=async ()=>{
            let xx;
            try{
              xx=await sqlpoduzece();
                console.log(xx[0].ime);
                ime=xx[0].ime;
                prezime=xx[0].prezime;
                adresa=xx[0].adresa;
                telefon=xx[0].telefon;
                oib=xx[0].oib;
                mjesto=xx[0].mjesto;

                document.querySelector("#naziv").innerHTML='"'+xx[0].poduzece+'"';
          
            }catch(e){
              console.log(e.message);
              
            }
          }
          
          pp();

    });

