'use strict';
let app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


let StudentUser = {
    email: "udit@gmail.com",
    password: "admin",
    type: "student"
}

let token;


describe('Glassdoor', function(){
    
    describe("Fetching all the undecided photos and reviews", () => {
        it(" fetches all the undecided photos", () => {
            agent.get("/getUndecidedPhotos")
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it(" fetches all the undecided reviews", () => {
            agent.post("/getUndecidedReviews")
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe("Student Login", () => {
        it(" verifies student's Login", () => {
            agent.post("/login")
                .send(StudentUser)
                .then((res) => {
                    token = res.token;
                    console.log("!@#$WFAWET@$#^%@#$^@#$^@#$^")
                    console.log(token);
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                });
        })

        it(" fetches Student Details", () => {
            agent.post("/getStudentDetails")
                .send({
                    user_id : 1
                })
                .set("authorization", token)
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    });

    describe("Fetching The Most Reviewed Companies", () => {
        it(" fetches the most reviewed companies", () => {
            agent.get("/getMostReviewedCompanies")
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    describe("Fetching The Most Rated Companies", () => {
        it(" fetches the most Rated companies", () => {
            agent.get("/getMostRatedCompanies")
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    describe("Fetching The Top CEOs", () => {
        it(" fetches The Top CEOs", () => {
            agent.get("/getTopCEOs")
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    describe("Fetching The Top Students", () => {
        it(" fetches The Top Students", () => {
            agent.get("/getTopStudents")
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    describe("Fetching The Most Views Companies", () => {
        it(" fetches the most viewed companies", () => {
            agent.get("/getMostViewedCompanies")
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    describe("Fetching All Companies' admin", () => {
        it(" fetches all companies' admin", () => {
            agent.get("/getAllCompaniesAdmin")
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
});