const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('studentrequest', {
    student_request_id: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'request',
        key: 'request_id'
      }
    },
    student_id: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'student',
        key: 'student_id'
      }
    },
    grade_id: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'gradesubject',
        key: 'grade_id'
      }
    },
    subject_id: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'gradesubject',
        key: 'subject_id'
      }
    },
    tuition: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    other_request: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'studentrequest',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "student_request_id" },
        ]
      },
      {
        name: "FK_StudentRequest_Student",
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
      {
        name: "FK_StudentRequest_GradeSubject",
        using: "BTREE",
        fields: [
          { name: "grade_id" },
          { name: "subject_id" },
        ]
      },
    ]
  });
};
