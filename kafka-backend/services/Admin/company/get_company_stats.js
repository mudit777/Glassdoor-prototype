const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
let applications = require('../../../Models/applications');

const get_stats = async (company_id) => {
    // Get job ids by the company
    let job_id_query = `SELECT j.job_id
    FROM jobs j, companies c
    WHERE j.company_id = c.company_id and j.company_id=${company_id};`

    let job_id_rows = await query(job_id_query);
    let the_applications = await applications.find({job_id: {$in: job_id_rows.map(row => row.job_id)}});

    console.log("haha")

    // # of hired applicants
    let the_hired_applications = the_applications.filter(app => app.application_status === "Hired");
    let num_of_hired_applicants = "No hired applicants so far"
    if (the_hired_applications.length > 0) {
        num_of_hired_applicants = {
            total_number: the_hired_applications.length,
            the_applications: the_hired_applications
        }
    }
    
    console.log("here")
    console.log(num_of_hired_applicants)

    // demographics, e.g. race: number
    let the_student_ids = the_applications.map(app => app.student_id);
    let processed_demo_result = "No application for your company so far"
    if (the_student_ids.length > 0) {
        let no_dup_student_ids = Array.from(new Set(the_student_ids));
        let demographic_query = `SELECT 
                                    IFNULL(student_race, "Not specified") as student_race, 
                                    COUNT(IFNULL(student_race, 1)) as the_count 
                                FROM students
                                WHERE student_id IN (${no_dup_student_ids})
                                GROUP BY student_race;`
        
        console.log(no_dup_student_ids);

        let demographic_result = await query(demographic_query) 
        processed_demo_result = demographic_result.map(row => {
            let the_row = {};
            the_row[row.student_race]= row.the_count;
            return the_row
        });

        console.log(processed_demo_result);
    }

    console.log("11111")


    // Job: # of ['Submitted', 'Withdraw', 'Reviewed', 'Initial Screening', 'Interviewing', 'Hired']
    let each_status_and_count = {
        "Submitted": 0,
        "Withdraw": 0,
        "Reviewed": 0,
        "Initial Screening": 0,
        "Interviewing": 0,
        "Hired": 0
    }

    the_applications.forEach((app) => {
        let app_status = app.application_status;
        each_status_and_count[app_status] = each_status_and_count[app_status] + 1
    })

    return {
        hired_applicants: num_of_hired_applicants,
        demographics: processed_demo_result,
        app_status_and_count: each_status_and_count
    };
}

const handle_request = async (message, callback) => {
    // # of hired applicants
    // demographics, e.g. race: number
    // Job: # of ['Submitted', 'Withdraw', 'Reviewed', 'Initial Screening', 'Interviewing', 'Hired']
    let response = {};
    try {
        let stats_result = await get_stats(message.company_id);
        response.code = 200;
        response.data = stats_result;
        callback(null, response);
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;

