const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server);
const ngrok = require('ngrok');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
var config = {
    apiKey: "AIzaSyD4J0jlt55bOEj9SEMLZmU1hdLOfTz1mX8",
    authDomain: "darcos-85c45.firebaseapp.com",
    projectId: "darcos-85c45",
    databaseURL: "https://darcos-85c45-default-rtdb.firebaseio.com",
    storageBucket: "darcos-85c45.appspot.com",
    messagingSenderId: "528029660684",
    appId: "1:528029660684:web:6e3b8954aba68ae0c1e029",
}
const init = initializeApp(config);
const db = getFirestore(init);
async function getCities(db,bs) {
    const citiesCol = collection(db, bs);
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    }
getCities(db,'Robos')
const port = 3000;
const token = "1oB61EUilgWea0bUBaSDe8ZJnke_6Z7KKEWvCdqFh3zkvy7F4"
async function start() {
    await ngrok.authtoken(token);
    const url = await ngrok.connect(port);
    console.log(url)
  };start()
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
  