module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define("user", {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    chat_id: {
      type: DataTypes.STRING,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    language_code:{
      type: DataTypes.STRING
    },
    socket_id: {
      type: DataTypes.STRING,
      default: 'offline'
    },
    balance: {
      type: DataTypes.DECIMAL,
      default: 0
    },
    uuid: {
      type: DataTypes.STRING,
      default: 0
    },
    isfirstrocket: {
      type: DataTypes.INTEGER,
      default: 0
    },
    issecondrocket: {
      type: DataTypes.INTEGER,
      default: 0
    },
    isfuelcan: {
      type: DataTypes.INTEGER,
      default: 0
    },
    isfuelstation: {
      type: DataTypes.INTEGER,
      default: 0
    }
  })

  return User

}
