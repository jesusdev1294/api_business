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
      WHERE lof.clientes.nombre_cliente like :nombre
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
          where lof.base.razon_social like :nombre
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

const getByNameOrRut = async (req, res) => {

  const word = req.params.word;
  const isValidRut = validarRut(word);

  if (isValidRut) {
    try {
      const data = await getByRut(word, res);
    } catch (error) {
      console.error('Error en getByRut:', error);
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
  } else if (esNombreValido(word)) {
    // Nueva validación: si es un nombre válido, busca por nombre
    console.log('Buscando por nombre...');
    await getByNombre(word, res);
  } else {
    // Tercera opción: si no es RUT ni nombre válido, retorna un error 400
    console.log('Entrada inválida: ni RUT ni nombre válido');
    return res.status(400).json({ error: 'Entrada inválida. Debe ser un RUT válido o un nombre.' });
  }
};

// Función para validar un RUT chileno
function validarRut(rut) {
  console.log("--------->ruuuuuut", rut);
  const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').toLowerCase();

  if (rutLimpio.length < 2) return false;

  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0, multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  let dvCalculado = 11 - (suma % 11);
  dvCalculado = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'k' : String(dvCalculado);

  return dvCalculado === dv;
}

// Nueva función para validar si es un nombre válido (solo letras y espacios)
function esNombreValido(nombre) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
}

module.exports = { getByRut , getAllTramoVentas, getByNameOrRut};
