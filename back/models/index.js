let sequelize = require('./db.js');
const Sequelize = require('sequelize');


const Meeting = require('./meeting')(sequelize, Sequelize.DataTypes);
const Participant = require('./participant')(sequelize, Sequelize.DataTypes);

Meeting.hasMany(Participant);
Participant.belongsTo(Meeting);

module.exports = {
    Meeting,
    Participant,
    sequelize,
}