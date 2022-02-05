const {INTEGER, STRING} = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING, unique: true },
    img: { type: STRING, allowNull: false }

});

const Group = sequelize.define('group', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING, unique: true, allowNull: false },
    description: { type: STRING, unique: true }
});

Group.hasMany(User);
User.belongsTo(Group);

module.exports = {
    User, Group
};
