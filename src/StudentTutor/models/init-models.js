var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _admin = require("./admin");
var _post = require("./post");
var _student = require("./student");
var _studentrequest = require("./studentrequest");
var _tutor = require("./tutor");
var _tutorrequest = require("./tutorrequest");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var admin = _admin(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);
  var studentrequest = _studentrequest(sequelize, DataTypes);
  var tutor = _tutor(sequelize, DataTypes);
  var tutorrequest = _tutorrequest(sequelize, DataTypes);

  admin.belongsTo(account, { as: "admin", foreignKey: "admin_id"});
  account.hasOne(admin, { as: "admin", foreignKey: "admin_id"});
  student.belongsTo(account, { as: "student", foreignKey: "student_id"});
  account.hasOne(student, { as: "student", foreignKey: "student_id"});
  tutor.belongsTo(account, { as: "tutor", foreignKey: "tutor_id"});
  account.hasOne(tutor, { as: "tutor", foreignKey: "tutor_id"});
  tutorrequest.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(tutorrequest, { as: "tutorrequests", foreignKey: "post_id"});
  studentrequest.belongsTo(student, { as: "student", foreignKey: "student_id"});
  student.hasMany(studentrequest, { as: "studentrequests", foreignKey: "student_id"});
  post.belongsTo(studentrequest, { as: "student_request", foreignKey: "student_request_id"});
  studentrequest.hasMany(post, { as: "posts", foreignKey: "student_request_id"});
  tutorrequest.belongsTo(tutor, { as: "tutor", foreignKey: "tutor_id"});
  tutor.hasMany(tutorrequest, { as: "tutorrequests", foreignKey: "tutor_id"});

  return {
    account,
    admin,
    post,
    student,
    studentrequest,
    tutor,
    tutorrequest,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
