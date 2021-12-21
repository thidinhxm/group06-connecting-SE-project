const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    post_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'studentrequest',
        key: 'student_request_id'
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    time: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    extra_fee: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    other_request: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "Chưa giao"
    }
  }, {
    sequelize,
    tableName: 'post',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "FK_Post_StudentRequest",
        using: "BTREE",
        fields: [
          { name: "student_request_id" },
        ]
      },
    ]
  });
};
