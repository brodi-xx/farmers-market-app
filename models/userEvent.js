const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

class UserEvent extends Model { }

UserEvent.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    event_time_start: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    event_time_end: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    event_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_event',
  }
);

UserEvent.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});


module.exports = UserEvent;
