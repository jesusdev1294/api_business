const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http')
const searchController = require('./controllers/search.controller');
const lofController = require('./controllers/lof.controller')

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.get('/api/search', searchController.search);
app.get('/lof/:rut', lofController.getByRut);


app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

module.exports.search = serverless(app)
