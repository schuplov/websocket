module.exports = (sequelize, DataTypes) => {

  const Improvements = sequelize.define("improvements", {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL
    },
    profit: {
      type: DataTypes.DECIMAL
    }
  })

  return Improvements

}
