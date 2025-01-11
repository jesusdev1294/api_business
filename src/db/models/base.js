const { DataTypes } = require('sequelize');
const sequelize = require('../conecction');

const Base = sequelize.define(
  'Base', // Nombre del modelo
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ano_comercial: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    razon_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tramo_segun_ventas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numero_trabajadores_dependientes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_inicio_actividades_vigente: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_termino_giro: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_primera_inscripcion_actividades: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tipo_termino_giro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo_contribuyente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subtipo_contribuyente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tramo_capital_propio_positivo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tramo_capital_propio_negativo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rubro_economico: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subrubro_economico: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    actividad_economica: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provincia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comuna: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_presunta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otros_regimenes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'base', // Nombre de la tabla en la base de datos
    timestamps: false,
  }
);

module.exports = { Base };
