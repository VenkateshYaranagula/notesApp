const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Note = sequelize.define('Note', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING },
  content: { type: DataTypes.TEXT },
  color: { type: DataTypes.STRING },
  archived: { type: DataTypes.BOOLEAN, defaultValue: false },
  userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } }
});

module.exports = Note;