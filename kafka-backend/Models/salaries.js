const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salariesschema = new Schema({
      company_id : Number,
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