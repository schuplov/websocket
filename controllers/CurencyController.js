const db = require('../shemas/index')
const User = db.user
const Curency = db.curency
const Improve = db.improvements

class GetCurency {
  async currency_user(socket){
    try{
      let curencyClick;

      const date_user = await User.findOne( {where: {socket_id: socket.id} });

      // ok
      if(date_user.isfirstrocket === 0 && date_user.issecondrocket === 0 && date_user.isfuelcan === 0 && date_user.isfuelstation === 0){
        const date_curency = await Curency.findAll({attributes: [ 'function', 'cost']})
        const info_curency = []
        Array.prototype.push.apply(info_curency, date_curency);
        return socket.emit('CurrencyUpdateCL', info_curency[0].dataValues.cost, info_curency[1].dataValues.cost);
      }
      if(date_user.isfirstrocket === 1 || date_user.issecondrocket === 1 || date_user.isfuelcan === 1 || date_user.isfuelstation === 1){
        const date_improve = await Improve.findAll({attributes: [ 'type', 'profit']})
        const info_improve = [];
        Array.prototype.push.apply(info_improve, date_improve);

        if(date_user.issecondrocket === 1){

        }
      }
      /*
      const date_improve = await Improve.findAll({attributes: [ 'type', 'profit']})

      const info_improve = [];
      Array.prototype.push.apply(info_improve, date_improve);*/

    }
    catch (e){
      console.log('======= GetCurency error ========');
      console.log(e)
    }
  }
}

module.exports = new GetCurency()


