const {contextBridge,ipcRenderer}=require('electron');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./baza.db');

const func={
  maximizeMsg:(msg)=>ipcRenderer.send("maximize-message-blagajna",msg),
  minimizeMsg:(msg)=>ipcRenderer.send("minimize-message-blagajna",msg),
  closeMsg:(msg)=>ipcRenderer.send("close-message-blagajna",msg),
}


contextBridge.exposeInMainWorld('poruka',func);


const API={
    sendMsg:(msg)=>ipcRenderer.send("message-from-window1",msg),
    sqlupit:sqlupit,
    zaporka:(func)=>ipcRenderer.on("from-zaporka",(event,args)=>{
      console.log(args);
      console.log(func(args));
    }),
}

contextBridge.exposeInMainWorld('apiblagajna',API);


var sqlupit=(id)=>{
  return new Promise((resolve,reject)=>{
    let sql = `SELECT * FROM sifrarnik where id=?`;
        db.all(sql,[id], function (err, rows) {
            if(err){
                reject(new Error(
                  "This promise is Rejected..."));
            }else{
            resolve(rows);
            }
        }); 
  })
  }


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


    var sqlkolicina=(id)=>{
      return new Promise((resolve,reject)=>{
        let sql = `SELECT id1,mjera1,id2,mjera2 from sifrarnik where id=?`;
            db.all(sql,[id], function (err, rows) {
                if(err){
                    reject(new Error(
                      "This promise is Rejected..."));
                }else{
                resolve(rows);
                }
            }); 
      })
      }

      let updatekolicina=(kolicina,sifra,mjera)=>{
        return new Promise((resolve,reject)=>{
    
      console.log(kolicina,sifra,mjera);
      var kolicinax;;
      db.each(`select kolicina from skladiste where id=?`, [sifra], function(err,row) {
        if (err) {
          return console.log(err.message);
        }
        console.log('kolicina/////',row['kolicina']);
        kolicinax=row['kolicina']-kolicina*mjera;
        db.run(`update skladiste set kolicina=? where id=?`, [kolicinax,sifra], function(err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
            console.log(kolicinax);
            resolve(`A row has been inserted with rowid ${this.lastID}`);
          
        });    
       
    })
    
        })
    }


    var sqlcount=()=>{
      return new Promise((resolve,reject)=>{
        let sql = `SELECT count(*) as count FROM racun;`;
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


      let sqlracun=(count,datum,vrijeme,cijena)=>{
        return new Promise((resolve,reject)=>{
    
            console.log(count,datum,vrijeme,cijena);
        
        db.run(`INSERT INTO racun (id_racun,vrijeme,datum,racun) VALUES (?,?,?,?)`, [count,datum,vrijeme,cijena], function(err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          resolve(`A row has been inserted with rowid ${this.lastID}`);
        });
    })
    }

  window.addEventListener('DOMContentLoaded', () => {
   
  document.getElementById('xx').onclick=function (){myCreateFunction()};
  document.getElementById('yy').addEventListener("click",myDeleteFunction);


  let str="";
  let s=0,ss=0;
  let row;
  let cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8;
  let myTable;
  let kk;
  let n;
  let t;
  let suma=0;
  let printstr1,printstr2;

  let ime,prezime,adresa,telefon,oib,mjesto,poduzece;

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
      poduzece=xx[0].poduzece;

  }catch(e){
    console.log(e.message);
    
  }
}

pp();




     document.getElementById('area').addEventListener("keypress", async function(event) {
 //event.preventDefault();
 console.log(event.key);
 

      if(event.key=="0")
        str+="0";
      else if(event.key=="1")
        str+="1";
      else if(event.key=="2")
        str+="2";
      else if(event.key=="3")
        str+="3";
      else if(event.key=="4")
        str+="4";
      else if(event.key=="5")
        str+="5";
      else if(event.key=="6")
        str+="6";
      else if(event.key=="7")
        str+="7";
      else if(event.key=="8")
        str+="8";
      else if(event.key=="9")
        str+="9";

 console.log(str);
 if(event.keyCode != 13){
  s=0;
  ss=0;
  }

 if (event.keyCode == 13 && s==0)
 {
    
   console.log("Enter inside div");
   document.getElementById('area').style.backgroundColor="#ff0000";

   try {
    let p=await sqlupit(str);
    if (p.length==0) throw new Error('greska');
    if (str=="") throw new Error('prazno');
    console.log(p[0].id,'----',p[0].artikl);
    myTable = document.getElementById('myTable').getElementsByTagName('tbody')[0];
 
    n = myTable.rows.length;
    console.log(myTable,'----',n);
    row=myTable.insertRow(n);
    cell1=row.insertCell(0);
    cell2=row.insertCell(1);
    cell3=row.insertCell(2);
    cell4=row.insertCell(3);
    cell5=row.insertCell(4);
    cell6=row.insertCell(5);
    cell7=row.insertCell(6);
    cell8=row.insertCell(7);
 
    cell1.innerHTML = n;
    cell2.innerHTML = p[0].id;
    cell3.innerHTML = p[0].artikl;
    cell4.innerHTML = 1;
    cell5.innerHTML = p[0].mjera1;
    cell6.innerHTML = p[0].cijena1.toFixed(2);;
    cell7.innerHTML = p[0].pdv1;
    cell8.innerHTML = 10;
    kk=p[0].cijena1;

    document.getElementById('area').style.backgroundColor="#00ff00";
    str="";
    s=1;
   } catch (e) {
    console.log("Error Message: ", e.message);
     str="";
     
 } finally {
     console.log('Proslo');
 }


 } else if (event.keyCode == 32)
 {

  for(let i=0;i<=n;i++){
  
    let broj=myTable.rows[n].cells[1].innerHTML;
    console.log("----",myTable.rows[n].cells[1].innerHTML);
    console.log("----",myTable.rows[n].cells[2].innerHTML);
    console.log("----",myTable.rows[n].cells[3].innerHTML);
    let idm=await sqlkolicina(broj);
    console.log('========',idm);

    let kolicina=parseFloat(myTable.rows[n].cells[3].innerHTML);
    let id1=idm[0].id1;
    let id2=idm[0].id2;
    let mjera1=idm[0].mjera1;
    let mjera2=idm[0].mjera2;

    let updatekolicinax;

    if(id1!=0){
        updatekolicinax=await updatekolicina(kolicina,id1,mjera1);console.log("///===////",updatekolicinax);
    }

    if(id2!=0){
        updatekolicinax=await updatekolicina(kolicina,id2,mjera2)
        console.log("///===////",updatekolicinax);
    }

    let count=await sqlcount();

    console.log('count',count);

    let brojko=count[0].count;

    brojko++;

    let datumx=document.getElementById('datum').innerHTML;
    let vrijemex=document.getElementById('vrijeme').innerHTML;

    let sqlracunp=await sqlracun(brojko,vrijemex,datumx,suma);

    console.log(sqlracunp);

    let result =brojko.toString().padStart(4,'0')+"/"+datumx.substring(8,10);

    document.getElementById('racun').innerHTML=result;

   
  }




    let sumax=document.getElementById('right').innerHTML;
    console.log("Space inside div");
    suma=0;
    document.getElementById('right').innerHTML=suma.toFixed(2);
    printstr1="";
    printstr2="";
    //printstr1+='<div class="slika"></div>';
    printstr1+='<p class="centered-xx">"'+poduzece+'"</p>';
    printstr1+='<p>&nbsp;</p>';
    printstr1+='<p class="centered-left">Vl. : '+ime+" "+prezime+'</p>';
    printstr1+='<p class="centered-left">Adresa : '+adresa+'</p>';
    printstr1+='<p class="centered-left">Mjesto : '+mjesto+'</p>';
    printstr1+='<p class="centered-left">OIB : '+oib+'</p>';
    printstr1+='<p class="centered-left">Telefon : '+telefon+'</p>';
    printstr1+='<p class="centered-left">Datum : '+document.getElementById('datum').innerHTML+'</p>';
    printstr1+='<p class="centered-left">Vrijeme : '+document.getElementById('vrijeme').innerHTML+'</p>';
    printstr1+='<p class="centered-left">Operator : '+document.getElementById('djelatnik').innerHTML+'</p>';

    printstr1+='<br>';
    printstr1+='<p class="centered-bold">Racun : '+document.getElementById('racun').innerHTML+'</p>';
   
    for(let i=0;i<=n;i++){
      console.log(myTable.rows[i].cells[3].innerHTML);
      console.log(myTable.rows[i].cells[2].innerHTML);
      console.log(myTable.rows[i].cells[7].innerHTML);
      printstr2+='<tr>';
      printstr2+='<td class="quantity">'+myTable.rows[i].cells[3].innerHTML+'</td>';
      printstr2+='<td class="description">'+myTable.rows[i].cells[2].innerHTML+'</td>';
      printstr2+='<td class="price">'+(parseFloat(myTable.rows[i].cells[7].innerHTML)/7.5345).toFixed(2)+'</td>';
      printstr2+='</tr>';
      }


      printstr2+='<tr>';
      printstr2+='<td class="quantity"></td>';
      printstr2+='<td class="description">TOTAL</td>';
      printstr2+='<td class="price">'+(sumax/7.5345).toFixed(2)+'</td>';
      printstr2+='</tr>';

      printstr2+='<tr>';
      printstr2+='<td class="quantity"></td>';
      printstr2+='<td class="description">PDV</td>';
      printstr2+='<td class="price">'+((sumax-sumax/1.25)/7.5345).toFixed(2)+'</td>';
      printstr2+='</tr>';

      printstr2+='<tr>';
      printstr2+='<td class="quantity">Tecaj</td>';
      printstr2+='<td class="description">Konverzije</td>';
      printstr2+='<td class="price">7.5345</td>';
      printstr2+='</tr>';

      while(myTable.rows.length!=0)
      {

        myTable.deleteRow(n);
        console.log(myTable,'----',n);
        n--;
      }
      

    printFun(printstr1,printstr2);
 }

 if (event.keyCode == 13 && s==1)
 {
  ss++;
  console.log("----/////",ss);
  // cell4.innerHTML=ss;
  // cell8.innerHTML=(parseFloat(ss)*parseFloat(kk)).toFixed(2);
  myTable.rows[n].cells[3].innerHTML=ss;
  myTable.rows[n].cells[7].innerHTML=(parseFloat(ss)*parseFloat(kk)).toFixed(2);
  suma+=parseFloat(myTable.rows[n].cells[5].innerHTML);
  document.getElementById('right').innerHTML=suma.toFixed(2);
 }


});


function myCreateFunction() {

}

function myDeleteFunction() {
  let myTable = document.getElementById('myTable').getElementsByTagName('tbody')[0];
  n = myTable.rows.length;
  document.getElementById('right').innerHTML=parseFloat(document.getElementById('right').innerHTML)-parseFloat(myTable.rows[n-1].cells[7].innerHTML);
  suma-=parseFloat(myTable.rows[n-1].cells[7].innerHTML);
  myTable.deleteRow(n-1);
  console.log(myTable,'----',n-1);
}


function printFun(str1,str2){
  var iframe = document.createElement('iframe');
  var html = '<html><head><style>';
      html+='* {font-size: 15px;font-family: "Arial";margin:0}';
      // html+='.slika {background-image: url(/home/igor/electron/project/project17/vino5.png);width:150px;height:150px;}';
      html+='td,th,tr,table {border-top: 1px solid gray;border-collapse: collapse;}';
      html+='td.description,th.description {width: 85px;max-width: 85px;}';
      html+='td.quantity,th.quantity {width: 50px;max-width: 50px;text-align:center;word-break: break-all;}';

      html+='td.price,th.price {width: 50px;max-width: 50px;text-align: right;word-break: break-all;}';
      html+='.centered-left {text-align:left;align-content:left;font-size:14px}';
      html+='.centered {text-align: center;align-content: center;}';
      html+='.centered-bold {text-align:center;font-style:italic;font-size:17px;font-weight:900;}';
      html+='.centered-xx {text-align:center;font-style:italic;font-size:22px;font-weight:900;}';
      html+='.ticket {width: 185px;max-width: 185px;}';
      html+='img {max-width: inherit;width: inherit;}';
      html+='@media print {@page {margin:20px 20px 20px 20px;}}</style></head>';
      html+='<body>';
  
      html+='<div class="ticket"><img src="./vino.jpg" alt="Logo">';

      html+=str1;
      html+='<p>&nbsp;</p>';
      html+='<table>';
      html+='<thead>';
      html+='<tr>';
      html+='<th class="quantity">Kol.</th>';
      html+='<th class="description">Opis</th>';
      html+='<th class="price">€€</th>';
      html+='</tr>';
      html+='</thead>';

      html+='<tbody>';
      html+=str2;

      
      
      html+='</tbody>';
      html+='</table>';
      html+='<p>&nbsp;</p><p>&nbsp;</p>';
      html+='<p class="centered">Hvala na posjeti</p>';
      html+='</div>';
      html+='</body></html>';





  iframe.style.display = "none";
  document.body.appendChild(iframe);
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(html);
  setTimeout(()=>{iframe.contentWindow.print();},100);
  iframe.contentWindow.document.close();


}

   



});