const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tutorrequest', {
    tutor_request_id: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'request',
        key: 'request_id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'post',
        key: 'post_id'
      }
    },
    tutor_id: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'tutor',
        key: 'tutor_id'
      }
    },
    degree: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    other_request: {
      type: DataTypes.TEXT,
      allowNull: true
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
