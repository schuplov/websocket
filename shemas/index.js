const dbConfig = require('../config/database.config.js');

const {Sequelize, DataTypes, QueryTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('DB / Status: Connection')
})
.catch(err => {
    console.log('DB / Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


//  Importing shemas
db.user = require('./userShema.js')(sequelize, DataTypes) // userModel
db.curency = require('./curencySchema.js')(sequelize, DataTypes)
db.improvements = require('./improveShema')(sequelize, DataTypes)
db.sequelize.sync({ force: false })
.then(() => {
    console.log('DB / Models SYNC')
})



// 1 to Many Relation






module.exports = db
