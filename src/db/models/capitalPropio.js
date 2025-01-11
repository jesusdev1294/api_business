const { DataTypes } = require('sequelize');
const sequelize = require('../conecction');

const CapitalPropio = sequelize.define(
  'CapitalPropio', // Nombre del modelo
  {
    idcapital_propio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    capital_propio: {
      type: DataTypes.DECIMAL(10, 2), // Puedes ajustar la precisión y escala según sea necesario
      allowNull: false,
    },
  },
  {
    tableName: 'capital_propio', // Nombre de la tabla en la base de datos
    timestamps: false,
  }
);

module.exports = { CapitalPropio };
