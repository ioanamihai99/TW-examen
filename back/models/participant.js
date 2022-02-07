//prima resursa
module.exports = (sequelize, DataTypes) =>
    sequelize.define('participant', {
        'name': DataTypes.STRING,
    });
