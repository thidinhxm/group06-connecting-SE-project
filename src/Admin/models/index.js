const Sequelize = require('sequelize');

const initModels = require('./initModels');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, 
    {
        port:process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: 'mysql',
});

module.exports = {
    sequelize: sequelize,
    models: initModels(sequelize),
}