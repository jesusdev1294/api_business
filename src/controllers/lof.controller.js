const { IdTramoRenta } = require('../db/models/tramoRenta');
const { Op, col, fn, literal , Sequelize } = require('sequelize');
//const { Op, Sequelize } = require('sequelize');
const { Cliente } = require('../db/models/clientes');
const { Base } = require('../db/models/base');
const { CapitalPropio } = require('../db/models/capitalPropio');
const { setupAssociations } = require('../db/models/association');
const sequelize = require('../db/conecction');


setupAssociations();



const getAllTramoVentas = async (req, res) => {
  try {
    const tramoRentas = await IdTramoRenta.findAll(); // Consulta todos los registros
    res.json(tramoRentas);
  } catch (error) {
    console.error('Error al consultar idtramo_venta:', error);
    res.status(500).send('Error al obtener los tramos de venta');
  }
};




// const getByRut = async (req, res) => {
//   const rut = req.params.rut; // Obtén el RUT desde los parámetros de la URL
//   try {
//     const [results, metadata] = await sequelize.query(`
//       SELECT
//         lof.base.ano_comercial AS ano_comercial, 
//         clientes.rut AS cliente_rut, 
//         lof.base.razon_social AS razon_social,
//         DATE_FORMAT(clientes.fecha_fin_cto, '%d/%m/%Y') AS fecha_fin_cto, 
//         tramo_renta.tramo_renta AS tramo_renta,  
//         DATE_FORMAT(lof.base.fecha_inicio_actividades_vigente, '%d/%m/%Y') AS fecha_inicio_actividades_vigente, 
//         DATE_FORMAT(lof.base.fecha_termino_giro, '%d/%m/%Y') AS fecha_termino_giro, 
//         (SELECT positivo.capital_propio 
//          FROM lof.capital_propio AS positivo 
//          WHERE positivo.idcapital_propio = lof.base.tramo_capital_propio_positivo) AS tramo_capital_propio_positivo, 
//         (SELECT negativo.capital_propio 
//          FROM lof.capital_propio AS negativo 
//          WHERE negativo.idcapital_propio = lof.base.tramo_capital_propio_negativo) AS tramo_capital_propio_negativo
//       FROM lof.clientes 
//       LEFT JOIN lof.base ON lof.base.rut = lof.clientes.rut_sin_dv
//       RIGHT JOIN lof.tramo_renta ON lof.base.tramo_segun_ventas = lof.tramo_renta.idtramo_renta  
//       WHERE lof.clientes.rut = :rut;
//     `, {
//       replacements: { rut }, // Sustituye el parámetro
//       type: sequelize.QueryTypes.SELECT, // Especifica el tipo de consulta
//     });
//     console.log("...z",results)
//     // Responde con los datos
//     return res.json(results);
//   } catch (error) {
//     console.error('Error al obtener los datos:', error);
//     return res.status(500).json({
//       message: 'Error interno del servidor',
//       error: error.message,
//     });
//   }
// };

const getByRut = async (req, res) => {
  try {
    const rut = req.params.rut; // Suponiendo que el 'rut' se pasa como parámetro
    console.log("Rut recibido:", rut); // Verifica que el RUT recibido es el correcto

    const [results, metadata] = await sequelize.query(`
      SELECT
        lof.base.ano_comercial AS ano_comercial, 
        clientes.rut AS cliente_rut, 
        lof.base.razon_social AS razon_social,
        DATE_FORMAT(clientes.fecha_fin_cto, '%d/%m/%Y') AS fecha_fin_cto, 
        tramo_renta.tramo_renta AS tramo_renta,  
        DATE_FORMAT(lof.base.fecha_inicio_actividades_vigente, '%d/%m/%Y') AS fecha_inicio_actividades_vigente, 
        DATE_FORMAT(lof.base.fecha_termino_giro, '%d/%m/%Y') AS fecha_termino_giro, 
        (SELECT positivo.capital_propio 
         FROM lof.capital_propio AS positivo 
         WHERE positivo.idcapital_propio = lof.base.tramo_capital_propio_positivo) AS tramo_capital_propio_positivo, 
        (SELECT negativo.capital_propio 
         FROM lof.capital_propio AS negativo 
         WHERE negativo.idcapital_propio = lof.base.tramo_capital_propio_negativo) AS tramo_capital_propio_negativo
      FROM lof.clientes 
      LEFT JOIN lof.base ON lof.base.rut = lof.clientes.rut_sin_dv
      RIGHT JOIN lof.tramo_renta ON lof.base.tramo_segun_ventas = lof.tramo_renta.idtramo_renta  
      WHERE lof.clientes.rut = :rut;
    `, {
      replacements: { rut }, // Sustituye el parámetro
      //type: sequelize.QueryTypes.SELECT, // Especifica el tipo de consulta
    });

    res.json({results});
  } catch (error) {
    console.log("Error al obtener los datos:", error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};



// const getByRut = async (req, res) => {
//   try {
//     const { rut } = req.params; // Capturar el RUT desde los parámetros de la URL

//     // Llamar al procedimiento almacenado
//     await sequelize.query(`CALL cliente_json(:rut, @resultado)`, {
//       replacements: { rut }, // Pasar el RUT como parámetro
//     });

//     // Recuperar el valor del resultado de la variable de salida
//     const [[output]] = await sequelize.query('SELECT @resultado AS resultado');

//     return res.json({
//       success: true,
//       data: output ? output.resultado : null,
//     });
//   } catch (error) {
//     console.error('Error al ejecutar el procedimiento almacenado:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Error interno del servidor',
//       error: error.message,
//     });
//   }
// };





module.exports = { getByRut , getAllTramoVentas};
