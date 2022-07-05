const {io} = require('../app')

const MainController = require("../controllers/maincontroller");
const ImpController = require("../controllers/improveControllers");

io.on('connection', (socket) => {

  console.log('-- | User Connect ' + socket.id)

  // ======= Авторизация пользователя ===========
  socket.on('authorizate', ( uuid ) => {
    console.log('kek')
    MainController.findbyuuid( uuid , socket.id).then( ( result ) => {
      if( result == null ){

        const auth      =    false;
        socket.emit('authorization', false, 0);
        socket.disconnect();
      } else {
        const auth       =     true;
        MainController.updateSocketId(uuid, socket.id);
        socket.emit('authorization', auth, result.balance);

      }
    })
      .catch( (err) => {
        console.log(err);
      })
  });
  // transfer authorizate
  socket.on('authorizateTransfer', ( ) => {

    MainController.getAuthStatus(socket.id ).then( ( result ) => {
      if( result == null ){
        const auth      =    false;
        socket.emit('authorizationTransfer', false, 0);
        socket.disconnect();
      } else {
        const auth       =     true;
        socket.emit('authorizationTransfer', auth, result.balance, result.id);

      }
    })
      .catch( (err) => {
        console.log(err);
      })
  });
  // ======= Дисконект пользователя ===========
  socket.on("disconnecting", (reason) => {

    MainController.OnDisconnect( socket.id ).then( ( ) => {
      console.log('-- | User Disconnect ' + socket.id)
      socket.disconnect();
    })
      .catch( (err) => {
        console.log(err);
      })
  });
  // ======= Обновление курса ===========
  socket.on('currencyUpdateClick', (msg) => {


    MainController.getCurrencyClick().then( ( result ) => {
      socket.emit('currencyUpdateClick', result);
    })
      .catch( (err) => {
        console.log(err);
      })

  })
  socket.on('currencyUpdateTime', (msg) => {


    MainController.getCurrencyTime().then( ( result ) => {
      socket.emit('currencyUpdateTime', result);
    })
      .catch( (err) => {
        console.log(err);
      })

  })
  // ======= Обновление баланса ===========
  socket.on('updateBalance', (msg) => {

    MainController.updateBalance( socket.id ).then( ( result ) => {
      socket.emit('updateBalance', result);
    })
      .catch( (err) => {
        console.log(err);
      })

  })
  // ======= Функция клика майнера ===========
  socket.on('onclick', (msg) => {

    MainController.clickFunction( socket.id ).then( ( result ) => {
      socket.emit('updateBalance', result);
    })
      .catch( (err) => {
        console.log(err);
      })
  })
  // ======= Деньги за нахождение в майнере ===========
  socket.on('timecoin', (msg) => {

    MainController.timeFunction( socket.id ).then( ( result ) => {
      socket.emit('updateBalance', result);
    })
      .catch( (err) => {
        console.log(err);
      })
  })
  // ======== Перевод денег другому игроку ==========
  socket.on('TransferMoney', (suspect_id, amount) => {

    MainController.TransferMoney( suspect_id, amount, socket.id ).then( ( result ) => {
      socket.emit('TransferMoneyClient', result)
    })
      .catch( (err) => {
        console.log(err);
      })
  })
  // Система улучшений
  socket.on('AuthorizateImprovementWS', () => {
    ImpController.AuthorizateImprovementWS(socket.id ).then( ( result ) => {
      if(result === null){
        socket.emit('AuthorizateImprovementCL', false)
      }
      socket.emit('AuthorizateImprovementCL',true, result.balance, result.isfirstrocket, result.issecondrocket, result.isfuelcan, result.isfuelstation)
    })
      .catch( (err) => {
        console.log(err);
      })
  })
  socket.on('GetImprovementsWS', () => {
    ImpController.GetImproveInfoWS(socket.id ).then( ( result ) => {
      const elements = [];
      Array.prototype.push.apply(elements, result);
      console.log(elements[0].dataValues)
      socket.emit('GetImprovementsCL',
        elements[0].dataValues.price,
        elements[0].dataValues.profit,

        elements[1].dataValues.price,
        elements[1].dataValues.profit,

        elements[2].dataValues.price,
        elements[2].dataValues.profit,

        elements[3].dataValues.price,
        elements[3].dataValues.profit
      )
    })
      .catch( (err) => {
        console.log(err);
      })
  })
  socket.on('BuyImproveWS', (type) => {
    ImpController.BuyImproveWS(socket.id, type ).then( ( result ) => {
      if (result){
        socket.emit('BuyImproveCL', true, type)
      } else {
        console.log('error with buy')
      }

    })
      .catch( (err) => {
        console.log(err);
      })
  })
});

