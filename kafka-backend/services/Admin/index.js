const get_undecided_reviews_controller = require('./review/get_undecided_reviews');
const approve_review_controller = require('./review/approve_review');
const reject_review_controller = require('./review/reject_review');
const get_undecided_photos_controller = require('./photo/get_undecided_photos');
const approve_photo_controller = require('./photo/approve_photo');
const reject_photo_controller = require('./photo/reject_photo');
const get_all_companies_controller = require('./company/get_all_companies');
const search_company_controller = require('./company/search_company');
const get_company_reviews_controller = require('./company/get_company_reviews');
const get_company_stats_controller = require('./company/get_company_stats')
const get_review_counts_controller = require('./dashboard/get_review_counts');
const get_most_reviewed_companies_controller = require('./dashboard/get_most_reviewd_companies');
const get_most_rated_companies_controller = require('./dashboard/get_most_rated_companies');
const get_top_ceos_controller = require('./dashboard/get_top_ceos');
const get_top_students_controller = require('./dashboard/get_top_students');
const get_most_viewed_companies_controller = require('./dashboard/get_most_viewed_companies');

exports.get_undecided_reviews = get_undecided_reviews_controller;
exports.approve_review = approve_review_controller;
exports.reject_review = reject_review_controller;
exports.get_undecided_photos = get_undecided_photos_controller;
exports.approve_photo = approve_photo_controller;
exports.reject_photo = reject_photo_controller;
exports.get_all_companies = get_all_companies_controller;
exports.search_company = search_company_controller;
exports.get_company_reviews = get_company_reviews_controller;
exports.get_company_stats = get_company_stats_controller;
exports.get_review_counts = get_review_counts_controller;
exports.get_most_reviewed_companies = get_most_reviewed_companies_controller;
exports.get_most_rated_companies = get_most_rated_companies_controller;
exports.get_top_ceos = get_top_ceos_controller;
exports.get_top_students = get_top_students_controller;
exports.get_most_viewed_companies = get_most_viewed_companies_controller;