//prima resursa
module.exports = (sequelize, DataTypes) =>
    sequelize.define('meeting', {
        'description': DataTypes.STRING,
        'url': DataTypes.STRING,
        'createdAt': {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
