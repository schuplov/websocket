const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);

const {port}= require ('./config/server.config')
const {AuthByID, OnDisconnect, GetCurency} = require('./routes')

const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});



io.on('connection', (socket) => {
  // global function when user disconnected
  socket.on("disconnecting", (reason) => {
    OnDisconnect.disc_user(socket);
  })
  // this authorization using only on homepage
  socket.on('AuthorizateUserByID_WS', ( uuid ) => {
      AuthByID.auth_user(socket, uuid);
  });
  //this currency using only on homepage
  socket.on('CurrencyUpdateWS', () =>{
      GetCurency.currency_user(socket)
  })
})






const start = async () => {
  try {
    http.listen(3001, () => {
      console.log(`👾 MOONCOIN {WSOCKET} STARTED ${port}`);
    });
  } catch (e) {
    console.log(e)
  }
}

start()
