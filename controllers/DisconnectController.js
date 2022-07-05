const db = require('../shemas/index')
const User = db.user

class OnDisconnect {
  async disc_user(socket){
    try{
      // dev server     await User.update({socket_id: '0', uuid: '0'}, {where: {socket_id: socket.id}})
      await User.update({socket_id: '0'}, {where: {socket_id: socket.id}})
      console.log('User' + socket.id + ' disconnected')
      return socket.disconnect();

    }
    catch (e){
      console.log('======= Disconnect error ========');
      console.log(e)
    }
  }
}

module.exports = new OnDisconnect()


