const employeesData = require('../json/employess.json');

function getAllEmployees(req, res) {
    res.json(employeesData);
}

function getEmployeesByPage(req, res) {
    const page = parseInt(req.query.page);
    const startIndex = (page - 1) * 2;
    const endIndex = startIndex + 1;
    const paginatedEmployees = employeesData.slice(startIndex, endIndex + 1);
    res.json(paginatedEmployees);
}

function getOldestEmployee(req, res) {
    const oldestEmployee = employeesData.reduce((oldest, employee) => {
        return employee.age > oldest.age ? employee : oldest;
    });
    res.json(oldestEmployee);
}

function getUsers(req, res) {
    if (req.query.user === 'true') {
        const userEmployees = employeesData.filter(employee => employee.privileges === 'user');
        res.json(userEmployees);
    } else {
        res.status(400).json({ code: 'bad_request' });
    }
}

function addEmployee(req, res) {
    const newEmployee = req.body;
    if (isValidEmployee(newEmployee)) {
        employeesData.push(newEmployee);
        res.status(201).json(newEmployee);
    } else {
        res.status(400).json({ code: 'bad_request' });
    }
}

function getEmployeesByBadge(req, res) {
    const badge = req.query.badges;
    if (badge) {
        const employeesWithBadge = employeesData.filter(employee => employee.badges.includes(badge));
        res.json(employeesWithBadge);
    } else {
        res.status(400).json({ code: 'bad_request' });
    }
}

function getEmployeeByName(req, res) {
    const name = req.params.name;
    const employee = employeesData.find(employee => employee.name === name);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ code: 'not_found' });
    }
}


function isValidEmployee(employee) {
    if (!employee.hasOwnProperty('name') ||
    !employee.hasOwnProperty('age') ||
    !employee.hasOwnProperty('phone') ||
    !employee.phone.hasOwnProperty('personal') ||
    !employee.phone.hasOwnProperty('work') ||
    !employee.phone.hasOwnProperty('ext') ||
    !employee.hasOwnProperty('privileges') ||
    !employee.hasOwnProperty('favorites') ||
    !employee.favorites.hasOwnProperty('artist') ||
    !employee.favorites.hasOwnProperty('food') ||
    !employee.hasOwnProperty('finished') ||
    !Array.isArray(employee.finished) ||
    !employee.hasOwnProperty('badges') ||
    !Array.isArray(employee.badges) ||
    !employee.hasOwnProperty('points') ||
    !Array.isArray(employee.points)) {
    return false;
}
    return true; 
}
module.exports = {
    getAllEmployees,
    getEmployeesByPage,
    getOldestEmployee,
    getUsers,
    addEmployee,
    getEmployeesByBadge,
    getEmployeeByName
};
