const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server);
const port = 3000;
app.use(express.static('./Darcos'));
app.get('/',(req,res) =>{res.sendFile(path.join(__dirname,'index.html'))})
io.on('connect',(soc) => {
    soc.join('room')
    console.log('connect')
    soc.on('message',(data) => {
        soc.on(data,(Rdata)=>{
            soc.to('room').emit(data+'R',Rdata)
        })
        soc.on(data+'C',(Cdata)=>{
            soc.to('room').emit(data+'cm',Cdata)
        })
    })
})
server.listen(port);
  
