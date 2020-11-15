const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    company_id: {type: String, required: true},
    company_name: {type: String, required: true},
    company_email: {type: String, required: true},
    company_password: {type: String, required: true},
    company_city: String,
    company_state: String,
    company_industry: {type: String, enum: ["Agriculture", "Food / beverage", "Textile / leather", "IT / Tech", "Construction", "Trade", "Accommodation", "Finance", "Public Administration", "Other Services"]},
    company_website: String,
    company_size: String,
    company_type: {type: String, enum: ["Profit", "Non-Profit"]},
    company_revenue: Number,
    company_headquarter: String,
    company_YOF: Date,
    company_desc: String,
    company_mission: String,
    company_ceo_first_name: String,
    company_ceo_last_name: String,
    company_total_reviews_count: {type: Number, default: 0},
    company_avg_overall_rating: {type: Number, default: 0},
    company_avg_rec_to_friend_rating: {type: Number, default: 0},
    company_avg_ceo_approval_rating: {type: Number, default: 0},
    company_first_name: String,
    company_last_name: String,
    creater_job_title: String
},
{
    versionKey: false
});

const companyModel = mongoose.model('companies', companySchema);
module.exports = companyModel;