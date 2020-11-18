var kafka = require('../../kafka/client');
const jwt = require('jsonwebtoken');
const { secret } = require('../../Utils/config');

exports.login = (req, res) => {
    kafka.make_request("login", req.body, (err, result) => {
        if(err)
        {
            console.log(err);
        }
        else{
            if(result.code === 500)
            {
                res.writeHead(500, {
                    "Content-Type" : "text/plain"
                })
                res.end("Server Side Error")
            }
            else if(result.code === 207)
            {
                res.writeHead(207,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid user");
            }
            else if(result.code === 209)
            {
                res.writeHead(209,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Wrong Password");
            }
            else if(result.code === 200)
            {
                var id = 0;
                switch(req.body.type)
                {
                    case "student":
                        id = result.data.student_id;
                        break;
                    case "company":
                        id = result.data.company_id;
                        break;
                }
                const payload = { id: id, source : req.body.type};
                const token = jwt.sign(payload, secret,  {
                    expiresIn: 1008000
                });
                result.data.token =  "JWT " + token;
                // 
                // res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'applicaton/json'
                })
                res.end(JSON.stringify(result.data));
            }
        }
    })
}