const userService = require("../services/user");

exports.listTutors = async (req, res, next) => {
  try {
    const keyword = req.query.query || "";
    const tutors = await userService.listTutors(keyword);
    res.render("users/tutors/tutorList", { tutors });
  } catch (err) {
    next(err);
  }
};

exports.showTutor = async (req, res, next) => {
  try {
    const tutor = await userService.showTutor(req.params.id);
    res.render("users/tutors/tutorDetail", { tutor });
  } catch (err) {
    next(err);
  }
};

exports.listStudents = async (req, res, next) => {
  try {
    const keyword = req.query.query || "";
    const students = await userService.listStudents(keyword);
    res.render("users/students/studentList", { students });
  } catch (err) {
    next(err);
  }
};

exports.showStudent = async (req, res, next) => {
  try {
    const student = await userService.showStudent(req.params.id);
    res.render("users/students/studentDetail", { student });
  } catch (err) {
    next(err);
  }
};

exports.lock = async (req, res, next) => {
  try {
    await userService.lock(req.params.id);
    if (req.body.userType == "tutor") {
      res.redirect("/users/tutors");
    } else {
      res.redirect("/users/students");
    }
  } catch (err) {
    next(err);
  }
};

exports.unlock = async (req, res, next) => {
  try {
    await userService.unlock(req.params.id);
    if (req.body.userType == "tutor") {
      res.redirect("/users/tutors");
    } else {
      res.redirect("/users/students");
    }
  } catch (err) {
    next(err);
  }
};
