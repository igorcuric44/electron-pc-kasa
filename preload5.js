const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
    maximizeMsg:(msg)=>ipcRenderer.send("maximize-message-sifrarnik",msg),
    minimizeMsg:(msg)=>ipcRenderer.send("minimize-message-sifrarnik",msg),
    closeMsg:(msg)=>ipcRenderer.send("close-message-sifrarnik",msg),
  }
  
  
  contextBridge.exposeInMainWorld('poruka',func);

var sqlsifrarnik=()=>{
    return new Promise((resolve,reject)=>{
    let sql = `SELECT * FROM sifrarnik;`;
        db.all(sql, function (err, rows) {
            if(err){
                console.log(err);
            }else{
            resolve(rows);
            }
        }); 
    })
    }

window.addEventListener('DOMContentLoaded', async() => {
   
    let sifrarnik=await sqlsifrarnik();
    console.log(sifrarnik);
    
    str="<div id='top' style='overflow-y: auto;'><table>";
    str+="<caption>SIFRARNIK</caption>";
    str+="<tr><th>ID</th><th>ARTIKL</th><th>ID1</th><th>MJERA1</th><th>CIJENA1</th><th>PDV1</th><th>ID2</th><th>MJERA2</th><th>CIJENA2</th><th>PDV2</th></tr>";
    for(let i=0;i<sifrarnik.length;i++)
    {
    
        str+="<tr><td>"+sifrarnik[i].id+"</td><td>"+sifrarnik[i].artikl+"</td><td>"+sifrarnik[i].id1+"</td><td>"+sifrarnik[i].mjera1+"</td><td>"+sifrarnik[i].cijena1+"</td><td>"+sifrarnik[i].pdv1+"</td><td>"+sifrarnik[i].id2+"</td><td>"+sifrarnik[i].mjera2+"</td><td>"+sifrarnik[i].cijena2+"</td><td>"+sifrarnik[i].pdv2+"</td></tr>";
    }
    str+="</table></div>";
    document.querySelector("#demo").innerHTML=str;
    
    
    
    document.querySelector("#zatvori").addEventListener("click",closeWindow);
    
    function closeWindow(){
        console.log("skladiste console")
        ipcRenderer.send("message-from-window5","pong");
    }
    
})