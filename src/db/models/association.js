const { Cliente } = require('./clientes');
const { Base } = require('./base');
const { IdTramoRenta } = require('./tramoRenta');
const { CapitalPropio } = require('./capitalPropio');

const setupAssociations = () => {
  // Relación Cliente -> Base
//   Cliente.hasOne(Base, {
//     foreignKey: 'rut_sin_dv',
//     sourceKey: 'rut',
//     as: 'base',
//   });

//   Cliente.hasOne(Base, { foreignKey: 'rut_sin_dv', sourceKey: 'rut' });
// Base.belongsTo(Cliente, { foreignKey: 'rut_sin_dv', targetKey: 'rut' });
Cliente.hasOne(Base, { foreignKey: 'rut_sin_dv', sourceKey: 'rut', as: 'base' });
Base.belongsTo(Cliente, { foreignKey: 'rut_sin_dv', targetKey: 'rut', as: 'base' });


//   Base.belongsTo(Cliente, {
//     foreignKey: 'rut_sin_dv',
//     targetKey: 'rut',
//     as: 'cliente',
//   });

  // Relación Base -> IdTramoRenta
  Base.belongsTo(IdTramoRenta, {
    foreignKey: 'tramo_segun_ventas',
    as: 'tramo_renta',
  });
  IdTramoRenta.hasMany(Base, {
    foreignKey: 'tramo_segun_ventas',
    as: 'bases',
  });

  // Relación Base -> CapitalPropio (tramo_capital_propio_positivo y negativo)
  Base.belongsTo(CapitalPropio, {
    foreignKey: 'tramo_capital_propio_positivo',
    as: 'capital_propio_positivo',
  });
  CapitalPropio.hasMany(Base, {
    foreignKey: 'tramo_capital_propio_positivo',
    as: 'bases_positivas',
  });

  Base.belongsTo(CapitalPropio, {
    foreignKey: 'tramo_capital_propio_negativo',
    as: 'capital_propio_negativo',
  });
  CapitalPropio.hasMany(Base, {
    foreignKey: 'tramo_capital_propio_negativo',
    as: 'bases_negativas',
  });
};

module.exports = { setupAssociations };
