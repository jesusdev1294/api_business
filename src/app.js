const express = require('express');
const bodyParser = require('body-parser');
const employeesController = require('./controllers/employees.controller');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.get('/api/employees', employeesController.getAllEmployees);
app.get('/api/employees/page', employeesController.getEmployeesByPage);
app.get('/api/employees/oldest', employeesController.getOldestEmployee);
app.get('/api/employees', employeesController.getUsers);
app.post('/api/employees', employeesController.addEmployee);
app.get('/api/employees', employeesController.getEmployeesByBadge);
app.get('/api/employees/:name', employeesController.getEmployeeByName);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
