const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD
const salarySchema = new Schema({
    // job 1 -> salary N
    // If student also needs to fetch salaries data, then we need to insert job_id and student_id here
    job_id: {type: String, required: true}, // jobID from MySQL
    salary_base: {type: [Number], required: true},
    salary_bonus: [Number],
    salary_YOE: {type: [Number], required: true} // Year of Experience
},
{
    versionKey: false
});

const salaryModel = mongoose.model('salaries', salarySchema);
module.exports = salaryModel;
=======
const salariesschema = new Schema({
      company_id : Number,
      student_id : Number,
      BaseSalary : String,
      Bonus : String,
      JobTitle  : String,
      Location : String,
      Experience : String,
      EmployementType : String,
      EmployerName : String,
      EmployementStatus : String,
      Gender : String
});

const salaries = mongoose.model('salaries', salariesschema);
module.exports = salaries;
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
