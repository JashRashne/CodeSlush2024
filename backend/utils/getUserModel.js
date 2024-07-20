const Security = require("../models/security.models");
const Student = require("../models/student.models");
const Teacher = require("../models/teacher.models");
const Warden = require("../models/warden.models");

const getUserModel = (role) => {
  switch (role) {
    case "student":
      return Student;
    case "warden":
      return Warden;
    case "security":
      return Security;
    case "teacher":
      return Teacher;
    default:
      throw new Error("Invalid role");
  }
};

module.exports = getUserModel;
