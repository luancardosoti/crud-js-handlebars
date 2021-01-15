const express = require('express');
const CompanyController = require('./controllers/CompanyController');

const routes = express.Router();

routes.get('/', CompanyController.index);

routes.get('/companies', CompanyController.getCompany);
routes.post('/companies', CompanyController.setCompany);

routes.get('/companies/:id', CompanyController.getUpdate);
routes.post('/companies/update', CompanyController.setUpdate);

routes.get('/delete/:id', CompanyController.deleteCompany);



module.exports = routes;