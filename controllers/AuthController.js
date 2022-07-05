const db = require('../shemas/index')
const User = db.user

class AuthByID {
  async auth_user(socket, uuid){
    try{
      const date_user      =        await User.findOne( {
        where: {uuid: uuid} });
      if(!date_user){
        socket.emit('authorization', false, 0);
        return socket.disconnect();
      }
      /*if(date_user.socket_id !== '0'){
        if(date_user.socket_id != socket.id){
          socket.emit('authorization', false, 0);
          return socket.disconnect();
        }
      }*/
      await User.update({socket_id: socket.id}, {where: {uuid: uuid}})
      socket.emit('AuthorizateUserByID_CL', true, date_user.balance);
    }
    catch (e){
      console.log('======= AuthByID error ========');
      console.log(e)
    }
  }
}

module.exports = new AuthByID()


