const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gradesubject', {
    grade_id: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'grade',
        key: 'grade_id'
      }
    },
    subject_id: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'subject',
        key: 'subject_id'
      }
    }
  }, {
    sequelize,
    tableName: 'gradesubject',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "grade_id" },
          { name: "subject_id" },
        ]
      },
      {
        name: "FK_GradeSubject_Subject",
        using: "BTREE",
        fields: [
          { name: "subject_id" },
        ]
      },
    ]
  });
};
