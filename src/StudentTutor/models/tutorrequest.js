const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tutorrequest', {
    tutor_request_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'post_id'
      }
    },
    tutor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tutor',
        key: 'tutor_id'
      }
    },
    phone: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    payment_option: {
      type: DataTypes.STRING(40),
      allowNull: false
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
    tableName: 'tutorrequest',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tutor_request_id" },
        ]
      },
      {
        name: "FK_TutorRequest_Post",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "FK_TutorRequest_Tutor",
        using: "BTREE",
        fields: [
          { name: "tutor_id" },
        ]
      },
    ]
  });
};
