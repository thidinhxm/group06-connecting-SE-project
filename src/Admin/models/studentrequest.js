const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('studentrequest', {
    student_request_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student',
        key: 'student_id'
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    time: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    other_request: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "Chưa duyệt"
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
    ]
  });
};
