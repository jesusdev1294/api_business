// models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../conecction');

    const IdTramoRenta = sequelize.define('IdTramoRenta', // Nombre del modelo
      {
        idtramo_renta: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        tramo_renta: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'tramo_renta', // Nombre de la tabla en la base de datos
        timestamps: false,
      }
    );

    module.exports = { IdTramoRenta }