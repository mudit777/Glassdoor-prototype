'use strict';
let app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


async function sleep(ms) {
    return await new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   

let studentUser = {
    email: "udit@gmail.com",
    password: "admin",
    type: "student"
}

let token;

describe('Glassdoor', function(){
    
    describe("Fetching all the undecided photos", () => {
        it(" fetches all the undecided photos", async () => {
            await sleep(1500);
            agent.get("/getUndecidedPhotos")
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe("Login", () => {
        it(" verifies login", async () => {
            await sleep(1500);
            agent.post("/login")
                .send(studentUser)
                .then(function (res) {
                    token = res.body.token;
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe("Fetching all the companies", () => {
        it(" fetches all the companies", async () => {
            await sleep(1500);
            agent.get("/getAllCompanies")
                .set("authorization", token)
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe("Fetching all the industries", () => {
        it(" fetches all the industries", async () => {
            await sleep(1500);
            agent.get("/getAllIndustries")
                .set("authorization", token)
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe("Fetching The Most Reviewed Companies", () => {
        it(" fetches the most reviewed companies", async () => {
            await sleep(1500);
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
        it(" fetches the most Rated companies", async () => {
            await sleep(1500);
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
        it(" fetches The Top CEOs", async () => {
            await sleep(1500);
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
        it(" fetches The Top Students", async () => {
            await sleep(1500);
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
        it(" fetches the most viewed companies", async () => {
            await sleep(1500);
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
        it(" fetches all companies' admin", async () => {
            await sleep(1500);
            agent.get("/getAllCompaniesAdmin")
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    describe("Fetching company photos", () => {
        it(" fetches company photos", async () => {
            await sleep(1500);
            agent.get("/getCompanyPhotos/1")
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
});