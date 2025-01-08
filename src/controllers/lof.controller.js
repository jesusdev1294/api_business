const { IdTramoRenta } = require('../db/models/tramoRenta');


const getAllTramoVentas = async (req, res) => {
    try {
      const tramoRentas = await IdTramoRenta.findAll(); // Consulta todos los registros
      res.json(tramoRentas);
    } catch (error) {
      console.error('Error al consultar idtramo_venta:', error);
      res.status(500).send('Error al obtener los tramos de venta');
    }
  };

  module.exports = {getAllTramoVentas}