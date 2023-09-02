const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
    maximizeMsg:(msg)=>ipcRenderer.send("maximize-message-zaporka",msg),
    minimizeMsg:(msg)=>ipcRenderer.send("minimize-message-zaporka",msg),
    closeMsg:(msg)=>ipcRenderer.send("close-message-zaporka",msg),
  }
  
  
  contextBridge.exposeInMainWorld('poruka',func);

let sqlzaporka=(imex,zaporkax)=>{
    return new Promise((resolve,reject)=>{
    console.log(imex,zaporkax);
    db.all(`select * from djelatnici where ime=? and zaporka=?`, [imex,zaporkax], function(err,row) {
        if (err) {
            reject(new Error(
                "Pogresna zaporka"));
        }
        console.log(row['ime'],row['prezime'],);
        resolve(row);
    })
})
}

window.addEventListener('DOMContentLoaded', () => {
   document.querySelector("#zatvori").addEventListener("click",closeWindow);

       async function closeWindow(){
            let imex=document.querySelector("#ime").value;
            let zaporkax=document.querySelector("#zaporka").value;

            console.log(imex," ",zaporkax)


            console.log("Skladisnica console")
            //window.apiunos.sqlunos(idx,artiklx,pdvx,kolicinax,mjerax,cijenax);
            //window.apiunos.sendMsg("pong unos");

            try {
            let px=await sqlzaporka(imex,zaporkax);
            
            
            console.log(px);
            console.log(px[0].ime);
            console.log(px[0].prezime);
            console.log(px[0].zaporka);
            ipcRenderer.invoke("get/blagajna",px);

            }catch(e)
            {
                console.log(e.message);
                alert("Pogresna zaporka");
            }





            //ipcRenderer.send('message-from-window6','Zatvori skladisnica prozor');
        }

    
});