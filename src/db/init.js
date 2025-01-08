const  sequelize  = require('./connection')
// const { User } = require('./models/user')
// const { Region } = require('./models/region')
// const { Comunne } = require('./models/commune')


function createInitialSchemas(){
    sequelize.sync()  
}

createInitialSchemas()