let Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'imapp',
    'root',
    '',
    {
        dialect: 'mysql',
        host: "localhost",
        charset: 'utf8',
        collate: 'utf8_general_ci',
        define: {
            timestamps: false
        }
    }
);

module.exports = sequelize;
