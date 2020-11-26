var get_undecided_reviews_controller = require('./get_undecided_reviews');
var approve_review_controller = require('./approve_review');
var reject_review_controller = require('./reject_review');

exports.get_undecided_reviews = get_undecided_reviews_controller;
exports.approve_review = approve_review_controller;
exports.reject_review = reject_review_controller;