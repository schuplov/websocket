module.exports = (sequelize, DataTypes) => {

  const Curency = sequelize.define("curency", {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    function: {
      type: DataTypes.STRING
    },
    cost: {
      type: DataTypes.DECIMAL,
      default: '0'
    }
  })

  return Curency

}
