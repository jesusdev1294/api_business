const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'lof.cfiuseaq84b2.us-east-1.rds.amazonaws.com',
    username: 'admin',
    password: 'Je2nE24xvT0SMbGUjOaV',
    database: 'lof',
    logging: console.log,
    //logging: false,
    define: {
      // Configuración global de Sequelize
      timestamps: true, // Habilita la creación de `createdAt` y `updatedAt`
      createdAt: 'created_at', // Cambia el nombre del campo `createdAt`
      updatedAt: 'updated_at', // Cambia el nombre del campo `updatedAt`
      underscored: true, // Utiliza nombres de campos con guiones bajos (snake_case)
      underscoredAll: true, // Aplica el cambio a todas las columnas, incluyendo las generadas automáticamente
    },
  });

  module.exports = sequelize;