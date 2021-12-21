const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    admin_id: {
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
    type_admin: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'admin',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "admin_id" },
        ]
      },
    ]
  });
};
