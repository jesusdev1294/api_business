const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverless = require('serverless-http')
const searchController = require('./controllers/search.controller');
const lofController = require('./controllers/lof.controller')


const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/search', searchController.search);
app.get('/lof/:word', lofController.getByNameOrRut);


app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

module.exports.lof = serverless(app)
