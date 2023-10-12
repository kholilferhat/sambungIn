'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Job.belongsTo(models.User, { foreignKey: 'authorId' })
      Job.belongsTo(models.Company, { foreignKey: 'companyId' })
      Job.hasMany(models.Skill, { foreignKey: 'jobId' })

    }
  }
  Job.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Title is required"' },
        notEmpty: { msg: 'Title is required"' },
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Description is required"' },
        notEmpty: { msg: 'Description is required"' },
      }
    },
    companyId: DataTypes.INTEGER,
    // authorId: DataTypes.INTEGER,
    jobType: DataTypes.STRING,
    mongoAuthor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};