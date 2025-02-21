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

const getByRut = async (rut, res) => {
  try {
    //const rut = req.params.rut; // Suponiendo que el 'rut' se pasa como parámetro
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
      WHERE lof.clientes.rut = :rut
      union all
      SELECT
        lof.base.ano_comercial AS ano_comercial, 
        lof.base.rut_full AS cliente_rut, 
        lof.base.razon_social AS razon_social,
        'No es clientes', 
        tramo_renta.tramo_renta AS tramo_renta,  
        DATE_FORMAT(lof.base.fecha_inicio_actividades_vigente, '%d/%m/%Y') AS fecha_inicio_actividades_vigente, 
        DATE_FORMAT(lof.base.fecha_termino_giro, '%d/%m/%Y') AS fecha_termino_giro, 
        (SELECT positivo.capital_propio 
         FROM lof.capital_propio AS positivo 
         WHERE positivo.idcapital_propio = lof.base.tramo_capital_propio_positivo) AS tramo_capital_propio_positivo, 
        (SELECT negativo.capital_propio 
         FROM lof.capital_propio AS negativo 
         WHERE negativo.idcapital_propio = lof.base.tramo_capital_propio_negativo) AS tramo_capital_propio_negativo
         FROM lof.base
          right join lof.tramo_renta on lof.base.tramo_segun_ventas = lof.tramo_renta.idtramo_renta  
          where lof.base.rut_full = :rut
          AND NOT EXISTS (
          SELECT 1
          FROM lof.clientes 
          WHERE lof.clientes.rut = :rut)
         ;
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

const getByNombre = async (nombre, res) => {
  try {
   // const nombre = req.params.nombre; 
    console.log("Nombre recibido:", nombre); 

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
      WHERE lof.clientes.nombre_cliente like ':nombre'
      union all
      SELECT
        lof.base.ano_comercial AS ano_comercial, 
        lof.base.rut_full AS cliente_rut, 
        lof.base.razon_social AS razon_social,
        'No es clientes', 
        tramo_renta.tramo_renta AS tramo_renta,  
        DATE_FORMAT(lof.base.fecha_inicio_actividades_vigente, '%d/%m/%Y') AS fecha_inicio_actividades_vigente, 
        DATE_FORMAT(lof.base.fecha_termino_giro, '%d/%m/%Y') AS fecha_termino_giro, 
        (SELECT positivo.capital_propio 
         FROM lof.capital_propio AS positivo 
         WHERE positivo.idcapital_propio = lof.base.tramo_capital_propio_positivo) AS tramo_capital_propio_positivo, 
        (SELECT negativo.capital_propio 
         FROM lof.capital_propio AS negativo 
         WHERE negativo.idcapital_propio = lof.base.tramo_capital_propio_negativo) AS tramo_capital_propio_negativo
         FROM lof.base
          right join lof.tramo_renta on lof.base.tramo_segun_ventas = lof.tramo_renta.idtramo_renta  
          where lof.base.razon_social like ':nombre'
          ;
    `, {
      replacements: { nombre: `%${nombre}%` }, // Sustituye el parámetro
      //type: sequelize.QueryTypes.SELECT, // Especifica el tipo de consulta
    });

    return res.json({results});
  } catch (error) {
    console.log("Error al obtener los datos:", error);
    return res.status(500).json({ error: 'Error al obtener los datos' });
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

const geyByNameOrRut =  async (req,res)  => {
  console.log('questttt',req.params.word)
 const valid =  validarRut2(req.params.word);
 console.log('-kdkdkd valllliddddddd',valid)
    if(valid){
      console.log('----->');
        try{
          const data = await getByRut(req.params.word, res);
          console.log('----->',data);
        }catch(error) {
          console.log('error');
          return res.status(500).json({ error: 'Error al obtener los datos' });
      } 
    } else {
      console.log('----->noofkfkfjk');
        await getByNombre(req.params.word, res);
      // return res.status(500).json({ error: 'Error al obtener los datos' });
    }


} 

function validarRut2(rut) {
  // Elimina puntos, guiones y convierte a minúsculas
  console.log("--------->ruuuuuut",rut)
  const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').toLowerCase();

  // Debe tener al menos 2 caracteres (cuerpo + dígito verificador)
  if (rutLimpio.length < 2) {
    return false;
  }

  // Separa el cuerpo del RUT y el dígito verificador
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);

  // Verifica que el cuerpo sea numérico
  if (!/^\d+$/.test(cuerpo)) {
    return false;
  }

  let suma = 0;
  let multiplo = 2;

  // Recorre el cuerpo del RUT de derecha a izquierda
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  // Calcula el dígito verificador esperado
  let dvCalculado = 11 - (suma % 11);
  if (dvCalculado === 11) {
    dvCalculado = '0';
  } else if (dvCalculado === 10) {
    dvCalculado = 'k';
  } else {
    dvCalculado = String(dvCalculado);
  }

  // Compara el dígito verificador calculado con el ingresado
  return dvCalculado === dv;
}

// // Ejemplo de uso sin puntos:
// const rut1 = "123456785";   // RUT con dígito verificador '5'
// const rut2 = "12345678-k";   // RUT con dígito verificador 'k'

// console.log(validarRut(rut1)); // true o false según el dígito verificador
// console.log(validarRut(rut2)); // true o false según el dígito verificador








module.exports = { getByRut , getAllTramoVentas, geyByNameOrRut};
