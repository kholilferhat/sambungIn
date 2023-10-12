'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsTo(models.Job, { foreignKey: 'jobId' })

    }
  }
  Skill.init({
    jobId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required"' },
        notEmpty: { msg: 'Name is required"' },
      }
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Level is required"' },
        notEmpty: { msg: 'Level is required"' },
      }
    }
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};