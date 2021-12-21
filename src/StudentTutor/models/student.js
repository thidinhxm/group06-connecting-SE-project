const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'account_id'
      }
    },
    display_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'student',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
    ]
  });
};
