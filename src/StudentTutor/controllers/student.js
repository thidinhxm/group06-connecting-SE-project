const { models } = require("../models");
const active = { student: true }

exports.sendRequest = function (req, res, next) {
  res.render("students/request",{active});
};

exports.storeRequest = async (req, res, next) => {
  const classroom = 'Lớp ' + req.body.classroom.toString()
  const subjects = req.body.subject.toString()
  const homeNumber = req.body.homeNumber;
  const ward = req.body.ward
  const road = req.body.road
  const city = req.body.city
  const address = homeNumber + ',' + road + ',' + ward + ',' + city
  const salary = req.body.fee
  const phone = req.body.phone
  const time = req.body.time
  const other_request = req.body.different

  const studentID = 1012;// maybe change when login complete

  const newStudentRequest = {
    // student_request_id: 4,
    student_id: studentID,
    address: address,
    phone: phone,
    salary: salary,
    grade: classroom,
    subject: subjects,
    time: time,
    other_request: other_request,
  };

  await models.studentrequest.create(newStudentRequest)
  res.json(newStudentRequest);
  // console.log(subjects.toString());
};
