const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Company = require('../models/Company');

const connection = new Sequelize(dbConfig);

Company.init(connection);

module.exports = connection;