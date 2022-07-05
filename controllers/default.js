const db = require('../shemas/index')
const User = db.user

class OnDisconnect {
  async disc_user(socket){
    try{

    }
    catch (e){
      console.log('======= Disconnect error ========');
      console.log(e)
    }
  }
}

module.exports = new AuthByID()


