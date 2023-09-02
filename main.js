const { app, BrowserWindow , ipcMain} = require('electron')
const path = require('path')

let win,skladiste,unos,blagajna,sifrarnik,skladisnica,brisanje,djelatnici,cijene,postavke,sifre,zaporka;

let isMaximized = true,isMaximized1 = true,isMaximized2 = true,isMaximized3 = true,isMaximized4=true,isMaximized5=true,isMaximized6=true,isMaximized7=true,isMaximized8=true,isMaximized9=true,isMaximized10=true,isMaximized11=true;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
        contextIsolation:true,
        sandbox: false,
      preload: path.join(__dirname, './preload_index.js')
    }
  })

    win.loadFile('./index.html')
    let wc=win.webContents;
    wc.openDevTools();
  
      win.on('closed', () => {
      win = null
      })
}

app.whenReady().then(() => {
    createWindow()
})

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })


  // win.on('closed', () => {
  //   win = null
  // });

  ipcMain.handle("get/zaporka",async (event,args)=>{
    console.log(args);

     if (zaporka) {
       zaporka.close();
     }
    
    zaporka=new BrowserWindow({
        //parent:win,
        width:1000,
        height:600,
        //modal: true, show: false ,
        title:"CHILD",
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            sandbox: false,
            preload:path.join(__dirname,'./preload0.js'),
        },
    });

    // zaporka.on('closed', () => {
    //   zaporka=null;
    //   console.log("zaporka closed xxxx")
    // })

    zaporka.loadFile('./zaporka.html');
    zaporka.webContents.openDevTools();
    zaporka.show();

    //event.sender.send("skladiste","message")
    return 1;
  }
  )

  ipcMain.handle("get/blagajna",async (event,args)=>{
    console.log(args);

    if (blagajna) {
       blagajna.close();
     }
    
    blagajna=new BrowserWindow({
        //parent:win,
        width:1000,
        height:600,
        //modal: true, show: false ,
        title:"CHILD",
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            sandbox: false,
            preload:path.join(__dirname,'./preload1.js'),
        },
    });

    // blagajna.on('closed', () => {
    //   blagajna=null;
    //   console.log("blagajna closed xxxx")
    // })

    blagajna.loadFile('./blagajna.html');
    blagajna.webContents.openDevTools();
    blagajna.show();

    blagajna.webContents.send("from-zaporka",args)
    return 1;
  }
  )


  ipcMain.handle("get/unos",async (event,args)=>{
    console.log(args);
    
    if (unos) {
       unos.close();
     }

    unos=new BrowserWindow({
        //parent:win,
        width:400,
        height:300,
        //modal: true, show: false ,
        title:"CHILD",
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            sandbox: false,
            preload:path.join(__dirname,'./preload2.js'),
        },
    });

    // unos.on('closed', () => {
    //   unos=null;
    // })

    unos.loadFile('./unos.html');
    unos.webContents.openDevTools();
    unos.show();

    //event.sender.send("skladiste","message")
    return 1;
  }
  )
 


  ipcMain.handle("get/version",async (event,args)=>{
    console.log(args);

    if (skladiste) {
      skladiste.close();
    }
    
    
    skladiste=new BrowserWindow({
        //parent:win,
        width:600,
        height:800,
        //modal: true, show: false ,
        title:"CHILD",
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            sandbox: false,
            preload:path.join(__dirname,'./preload3.js'),
        },
    });

  //   skladiste.on('closed', () => {
  //     skladiste= null
  // })

    skladiste.loadFile('./skladiste.html');
    skladiste.webContents.openDevTools();
    skladiste.show();

    //event.sender.send("skladiste","message")
    return 1;
  }
  )
  
  
  ipcMain.handle("get/sifre",async (event,args)=>{
    console.log(args);

    if (sifre) {
      sifre.close();
    }

  sifre=new BrowserWindow({
    //parent:win,
    width:1000,
    height:600,
    //modal: true, show: false ,
    title:"CHILD",
    frame:false,
    webPreferences:{
        nodeIntegration:true,
        sandbox: false,
        preload:path.join(__dirname,'./preload4.js'),
    },
});

// sifre.on('closed', () => {
//   sifre=null;
//   console.log("blagajna closed xxxx")
// })

sifre.loadFile('./sifre.html');
sifre.webContents.openDevTools();
sifre.show();

return 1;
}
)


  ipcMain.handle("get/sifrarnik",async (event,args)=>{
    console.log(args);

    if (sifrarnik) {
      sifrarnik.close();
    }
      sifrarnik=new BrowserWindow({
        //parent:win,
        width:600,
        height:800,
        //modal: true, show: false ,
        title:"CHILD",
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            sandbox: false,
            preload:path.join(__dirname,'./preload5.js'),
        },
    });

  //   sifrarnik.on('closed', () => {
  //     sifrarnik= null
  //     console.log("sifrarnik closed xxxx")
  // })

    sifrarnik.loadFile('./sifrarnik.html');
    sifrarnik.webContents.openDevTools();
    sifrarnik.show();

    //event.sender.send("skladiste","message")
    return 1;
  }
  )

  ipcMain.handle("get/skladisnica",async (event,args)=>{
    console.log(args);

    if (skladisnica) {
      skladisnica.close();
    }

      skladisnica=new BrowserWindow({
        //parent:win,
        width:600,
        height:800,
        //modal: true, show: false ,
        title:"CHILD",
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            sandbox: false,
            preload:path.join(__dirname,'./preload6.js'),
        },
    });

  //   skladisnica.on('closed', () => {
  //     skladisnica= null
  //     console.log("skladisnica closed xxxx")
  // })

    skladisnica.loadFile('./skladisnica.html');
    skladisnica.webContents.openDevTools();
    skladisnica.show();

    //event.sender.send("skladiste","message")
    return 1;
  }
  )

  ipcMain.handle("get/brisanje",async (event,args)=>{
    console.log(args);

    if(brisanje){
        brisanje.close();
    }

      brisanje=new BrowserWindow({
        //parent:win,
        width:600,
        height:800,
        //modal: true, show: false ,
        title:"CHILD",
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            sandbox: false,
            preload:path.join(__dirname,'./preload7.js'),
        },
    });

  //   brisanje.on('closed', () => {
  //     skladisnica= null
  //     console.log("brisanje closed xxxx")
  // })

    brisanje.loadFile('./brisanje_artikla.html');
    brisanje.webContents.openDevTools();
    brisanje.show();

    //event.sender.send("skladiste","message")
    return 1;
  }
  )


  ipcMain.handle("get/djelatnici",async (event,args)=>{
    console.log(args);

    if(djelatnici){
      djelatnici.close();
    }

      djelatnici=new BrowserWindow({
        //parent:win,
        width:600,
        height:800,
        //modal: true, show: false ,
        title:"CHILD",
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            sandbox: false,
            preload:path.join(__dirname,'./preload9.js'),
        },
    });

  //   djelatnici.on('closed', () => {
  //     djelatnici= null
  //     console.log("djelatnici closed xxxx")
  // })

    djelatnici.loadFile('./djelatnici.html');
    djelatnici.webContents.openDevTools();
    djelatnici.show();

    //event.sender.send("skladiste","message")
    return 1;
  }
  )


  ipcMain.handle("get/cijene",async (event,args)=>{
    console.log(args);

     if (cijene) {
       cijene.close();
   }
    
    cijene=new BrowserWindow({
        //parent:win,
        width:1000,
        height:600,
        //modal: true, show: false ,
        title:"CHILD",
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            sandbox: false,
            preload:path.join(__dirname,'./preload8.js'),
        },
    });

    // cijene.on('closed', () => {
    //   cijene=null;
    //   console.log("cijene closed xxxx")
    // })

    cijene.loadFile('./cijene.html');
    cijene.webContents.openDevTools();
    cijene.show();

    //event.sender.send("skladiste","message")
    return 1;
  }
  )
 
  ipcMain.handle("get/postavke",async (event,args)=>{
    console.log(args);

    if (postavke) {
       postavke.close();
     }
    
    postavke=new BrowserWindow({
        //parent:win,
        width:1000,
        height:600,
        //modal: true, show: false ,
        title:"CHILD",
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            sandbox: false,
            preload:path.join(__dirname,'./preload10.js'),
        },
    });

    // postavke.on('closed', () => {
    //   postavke=null;
    //   console.log("postavke closed xxxx")
    // })

    postavke.loadFile('./postavke.html');
    postavke.webContents.openDevTools();
    postavke.show();

    //event.sender.send("skladiste","message")
    return 1;
  }
  )


  ipcMain.on('message-from-window1',(event,args)=>{
    //win.webContents.send("message-enable-button1","enable 1");
    console.log('main received prozor 1',args);
    blagajna.close();
    blagajna=!blagajna;
    
})

  ipcMain.on('message-from-window2',(event,args)=>{
    //win.webContents.send("message-enable-button1","enable 1");
    console.log('main received prozor 2',args);
    unos.close();
    unos=!unos;
})

  ipcMain.on('message-from-window3',(event,args)=>{
    //win.webContents.send("message-enable-button1","enable 1");
    console.log('main received prozor 3',args);
    skladiste.close();
    skladiste=!skladiste;
})



ipcMain.on('message-from-window5',(event,args)=>{
  //win.webContents.send("message-enable-button1","enable 1");
  console.log('main received prozor 5',args);
  sifrarnik.close();
  sifrarnik=!sifrarnik;
})


ipcMain.on('message-from-window6',(event,args)=>{
  //win.webContents.send("message-enable-button1","enable 1");
  console.log('main received prozor 6',args);
  skladisnica.close();
  skladisnica=!skladisnica;
})

ipcMain.on('message-from-window7',(event,args)=>{
  //win.webContents.send("message-enable-button1","enable 1");
  console.log('main received prozor 7',args);
  brisanje.close();
  brisanje=!brisanje;
})

ipcMain.on('message-from-window8',(event,args)=>{
  //win.webContents.send("message-enable-button1","enable 1");
  console.log('main received prozor 8',args);
  cijene.close();
  cijene=!cijene;
})

ipcMain.on('message-from-window9',(event,args)=>{
  //win.webContents.send("message-enable-button1","enable 1");
  console.log('main received prozor 9',args);
  djelatnici.close();
  djelatnici=!djelatnici;
})




ipcMain.on('get/izlaz',(event,args)=>{
  //win.webContents.send("message-enable-button1","enable 1");
  console.log('main received ',args);
  
  if (skladiste) {
    skladiste.close();
    console.log("skladiste closed");
  }

  if (unos) {
    unos.close();
    console.log("Unos closed");
  }
   

  if (blagajna) {
    blagajna.close();
    console.log("Blagajna closed");
  }

  if (sifrarnik) {
    sifrarnik.close();
    console.log("Sifrarnik closed");
  }

  if (skladisnica) {
    skladisnica.close();
    console.log("Skladisnicaclosed");
  }

  if (brisanje) {
    brisanje.close();
    console.log("Brisanje artikla closed");
  }

  if (sifre) {
    sifre.close();
    console.log("Brisanje artikla closed");
  }

  if (djelatnici) {
    djelatnici.close();
    console.log("Unos djelatnika closed");
  }

  if (cijene) {
    cijene.close();
    console.log("Promijena cijene closed");
  }
  
  if (zaporka) {
    zaporka.close();
    console.log("Zaporka closed");
  }
  win.close();
  console.log("win closed");

})

ipcMain.on('close-message',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   if (skladiste) {
    skladiste.close();
    console.log("skladiste closed");
  }

  if (unos) {
    unos.close();
    console.log("Unos closed");
  }
   

  if (blagajna) {
    blagajna.close();
    console.log("Blagajna closed");
  }

  if (sifrarnik) {
    sifrarnik.close();
    console.log("Sifrarnik closed");
  }

  if (skladisnica) {
    skladisnica.close();
    console.log("Skladisnicaclosed");
  }

  if (brisanje) {
    brisanje.close();
    console.log("Brisanje artikla closed");
  }

  if (sifre) {
    sifre.close();
    console.log("Brisanje artikla closed");
  }

  if (djelatnici) {
    djelatnici.close();
    console.log("Unos djelatnika closed");
  }

  if (cijene) {
    cijene.close();
    console.log("Promijena cijene closed");
  }
  
  if (zaporka) {
    zaporka.close();
    console.log("Zaporka closed");
  }
  win.close();
  console.log("win closed");
  
})

ipcMain.on('maximize-message',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   isMaximized = !isMaximized;
   isMaximized ? win.unmaximize() : win.maximize();
  
})

ipcMain.on('minimize-message',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   win.minimize();
   
})


ipcMain.on('close-message-unos',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   unos.close();
   unos=!unos;
  
})

ipcMain.on('maximize-message-unos',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   isMaximized1=!isMaximized1;
   isMaximized1?unos.unmaximize():unos.maximize();
  
})

ipcMain.on('minimize-message-unos',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   unos.minimize();
   
})

ipcMain.on('close-message-blagajna',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   blagajna.close();
   blagajna=!blagajna;
  
})

ipcMain.on('maximize-message-blagajna',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   isMaximized2=!isMaximized2;
   isMaximized2?blagajna.unmaximize():blagajna.maximize();
  
})

ipcMain.on('minimize-message-blagajna',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   blagajna.minimize();
   
})

ipcMain.on('close-message-zaporka',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   zaporka.close();
   zaporka=!zaporka;
  
})

ipcMain.on('maximize-message-zaporka',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   isMaximized3=!isMaximized3;
   isMaximized3?zaporka.unmaximize():zaporka.maximize();
  
})

ipcMain.on('minimize-message-zaporka',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   zaporka.minimize();
   
})

ipcMain.on('close-message-skladiste',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   skladiste.close();
   skladiste=!skladiste;
  
})

ipcMain.on('maximize-message-skladiste',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received-unos ',args);
   isMaximized4= !isMaximized4;
   isMaximized4 ? skladiste.unmaximize() : skladiste.maximize();
  
})

ipcMain.on('minimize-message-skladiste',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   skladiste.minimize();
   
})

ipcMain.on('close-message-sifre',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received sifre',args);
   sifre.close();
   sifre=!sifre;
  
})

ipcMain.on('maximize-message-sifre',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received-sifre ',args);
   isMaximized5=!isMaximized5;
   isMaximized5?sifre.unmaximize():sifre.maximize();
  
})

ipcMain.on('minimize-message-sifre',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received sifre',args);
   sifre.minimize();
   
})

ipcMain.on('close-message-sifrarnik',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received sifrarnik',args);
   sifrarnik.close();
   sifrarnik=!sifrarnik;
  
})

ipcMain.on('maximize-message-sifrarnik',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received-sifrarnik ',args);
   isMaximized6=!isMaximized6;
   isMaximized6?sifrarnik.unmaximize():sifrarnik.maximize();
  
})

ipcMain.on('minimize-message-sifrarnik',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received sifrarnik',args);
   sifrarnik.minimize();
   
})


ipcMain.on('close-message-skladisnica',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   skladisnica.close();
   skladisnica=!skladisnica;
  
})

ipcMain.on('maximize-message-skladisnica',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received-skladisnica ',args);
   isMaximized7= !isMaximized7;
   isMaximized7 ? skladisnica.unmaximize() : skladisnica.maximize();
  
})

ipcMain.on('minimize-message-brisanje',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   brisanje.minimize();
   
})

ipcMain.on('close-message-brisanje',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   brisanje.close();
   brisanje=!brisanje;
  
})

ipcMain.on('maximize-message-brisanje',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received-skladisnica ',args);
   isMaximized8= !isMaximized8;
   isMaximized8 ?brisanje.unmaximize():brisanje.maximize();
  
})

ipcMain.on('minimize-message-brisanje',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received ',args);
   brisanje.minimize();
   
})

ipcMain.on('close-message-cijene',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received cijene',args);
   cijene.close();
   cijene=!cijene;
  
})

ipcMain.on('maximize-message-cijene',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received cijene ',args);
   isMaximized9=!isMaximized9;
   isMaximized9?cijene.unmaximize():cijene.maximize();
  
})

ipcMain.on('minimize-message-cijene',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received cijene',args);
   cijene.minimize();
   
})

ipcMain.on('close-message-djelatnici',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received djelatnici',args);
   djelatnici.close();
   djelatnici=!djelatnici;
  
})

ipcMain.on('maximize-message-djelatnici',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received djelatnici',args);
   isMaximized10=!isMaximized10;
   isMaximized10?djelatnici.unmaximize():djelatnici.maximize();
  
})

ipcMain.on('minimize-message-djelatnici',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received djelatnici',args);
   djelatnici.minimize();
   
})

ipcMain.on('close-message-postavke',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received postavke',args);
   postavke.close();
   postavke=!postavke;
  
})

ipcMain.on('maximize-message-postavke',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received postavke',args);
   isMaximized11=!isMaximized11;
   isMaximized11?postavke.unmaximize():postavke.maximize();
  
})

ipcMain.on('minimize-message-postavke',(event,args)=>{
  //event.sender.send('read-file-success','pong');
   console.log('main received postavke',args);
   postavke.minimize();
   
})