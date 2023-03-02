const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    
    const url = "https:us21.api.mailchimp.com/3.0/lists/ed456a58dd";

    const options = {
        method: "post",
        auth: "ali:f46797f6aa35f1c8c59547a331c13f4d-us21"
    }
        
    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        };

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });

    console.log(firstName, lastName, email);
    request.write(jsonData);
    request.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000.");
});

