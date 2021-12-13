var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _admin = require("./admin");
var _grade = require("./grade");
var _gradesubject = require("./gradesubject");
var _post = require("./post");
var _request = require("./request");
var _student = require("./student");
var _studentrequest = require("./studentrequest");
var _subject = require("./subject");
var _tutor = require("./tutor");
var _tutorrequest = require("./tutorrequest");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var admin = _admin(sequelize, DataTypes);
  var grade = _grade(sequelize, DataTypes);
  var gradesubject = _gradesubject(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var request = _request(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);
  var studentrequest = _studentrequest(sequelize, DataTypes);
  var subject = _subject(sequelize, DataTypes);
  var tutor = _tutor(sequelize, DataTypes);
  var tutorrequest = _tutorrequest(sequelize, DataTypes);

  grade.belongsToMany(subject, { as: 'subject_id_subjects', through: gradesubject, foreignKey: "grade_id", otherKey: "subject_id" });
  subject.belongsToMany(grade, { as: 'grade_id_grades', through: gradesubject, foreignKey: "subject_id", otherKey: "grade_id" });
  admin.belongsTo(account, { as: "admin", foreignKey: "admin_id"});
  account.hasOne(admin, { as: "admin", foreignKey: "admin_id"});
  student.belongsTo(account, { as: "student", foreignKey: "student_id"});
  account.hasOne(student, { as: "student", foreignKey: "student_id"});
  tutor.belongsTo(account, { as: "tutor", foreignKey: "tutor_id"});
  account.hasOne(tutor, { as: "tutor", foreignKey: "tutor_id"});
  gradesubject.belongsTo(grade, { as: "grade", foreignKey: "grade_id"});
  grade.hasMany(gradesubject, { as: "gradesubjects", foreignKey: "grade_id"});
  studentrequest.belongsTo(gradesubject, { as: "grade", foreignKey: "grade_id"});
  gradesubject.hasMany(studentrequest, { as: "studentrequests", foreignKey: "grade_id"});
  studentrequest.belongsTo(gradesubject, { as: "subject", foreignKey: "subject_id"});
  gradesubject.hasMany(studentrequest, { as: "subject_studentrequests", foreignKey: "subject_id"});
  tutorrequest.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(tutorrequest, { as: "tutorrequests", foreignKey: "post_id"});
  studentrequest.belongsTo(request, { as: "student_request", foreignKey: "student_request_id"});
  request.hasOne(studentrequest, { as: "studentrequest", foreignKey: "student_request_id"});
  tutorrequest.belongsTo(request, { as: "tutor_request", foreignKey: "tutor_request_id"});
  request.hasOne(tutorrequest, { as: "tutorrequest", foreignKey: "tutor_request_id"});
  studentrequest.belongsTo(student, { as: "student", foreignKey: "student_id"});
  student.hasMany(studentrequest, { as: "studentrequests", foreignKey: "student_id"});
  post.belongsTo(studentrequest, { as: "student_request", foreignKey: "student_request_id"});
  studentrequest.hasMany(post, { as: "posts", foreignKey: "student_request_id"});
  gradesubject.belongsTo(subject, { as: "subject", foreignKey: "subject_id"});
  subject.hasMany(gradesubject, { as: "gradesubjects", foreignKey: "subject_id"});
  tutorrequest.belongsTo(tutor, { as: "tutor", foreignKey: "tutor_id"});
  tutor.hasMany(tutorrequest, { as: "tutorrequests", foreignKey: "tutor_id"});

  return {
    account,
    admin,
    grade,
    gradesubject,
    post,
    request,
    student,
    studentrequest,
    subject,
    tutor,
    tutorrequest,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
