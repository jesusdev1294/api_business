const { DataTypes } = require('sequelize');
const sequelize = require('../conecction');

const Cliente = sequelize.define(
  'Cliente', // Nombre del modelo
  {
    idclientes: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_ini_cto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_fin_cto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rut_sin_dv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'clientes', // Nombre de la tabla en la base de datos
    timestamps: false,
  }
);

module.exports = { Cliente };
