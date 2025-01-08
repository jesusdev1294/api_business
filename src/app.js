const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http')
const searchController = require('./controllers/search.controller');
const idTramoRentaController = require('./controllers/lof.controller')

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.get('/api/search', searchController.search);
app.get('/api/renta', idTramoRentaController.getAllTramoVentas);


app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

module.exports.search = serverless(app)
