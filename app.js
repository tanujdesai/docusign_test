var express = require('express');
var cors = require('cors')
const axios = require('axios')
var app = express();
var bodyParser = require('body-parser')
var qs = require('qs');
// const docusign = require('docusign-esign')
// var oAuth = docusign.ApiClient.OAuth;
// var restApi = docusign.ApiClient.RestApi;



var config = {
    method: 'post',
    body: 'grant_type=authorization_code&code=eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAYABwCAqSYTJ03ZSAgAgDWtWidN2UgCAN5jIazYnbtGiDIlcKT0fB4VAAEAAAAYAAEAAAAFAAAADQAkAAAAMTBkYjQ4OGItOGI2Ni00MTBjLWJiNGUtYWJjMjIwOGM4YjI0IgAkAAAAMTBkYjQ4OGItOGI2Ni00MTBjLWJiNGUtYWJjMjIwOGM4YjI0NwBsDo-B-4ejT43yekQ7LmWHMACASG1DJU3ZSA.gfDR8X7ss5qt1jpo3iP4qgPS2nB0GBp3FD2Ga9IxQXKJmzcRRU-6RKKxtV15-DiE4OvEPsXdJ4XKGi2wgyAMLoH525G5BNn3pG9Hfq2due1CQ_1pbG24PxOoAslvQQdd-LjKC3NE_V_5gMJsPHTx5PlyjOtPomCh_0FXp55UQ01wsgObTfPMavB3vhfm2HrH6dDYhRS1s1_Yeo5CJbQprZkWbpGiy42HgjDRZB1ST18ZUDpEtvxqF5VuQ2Qb4iGnzxa_zOV9qXBKfu5WWMxZcUx3d8mpO_vS5gM-nhZCrByNJ7NkUKVbM1Ytp18SndlTB3S9QZPiq2SL4spVWPhZXw',
    header: 'Authorization: Basic MTBkYjQ4OGItOGI2Ni00MTBjLWJiNGUtYWJjMjIwOGM4YjI0OjAxYTlhYTE0LTAwNTctNGNmNC1hNWUwLTZiODljNjMwMWRiNQ==',
    url:'http://localhost'
}

// secret 0b0427a6-e09f-446c-8761-c1e0b76e360d
// redirect http://localhost:5000/upload
// integration 10db488b-8b66-410c-bb4e-abc2208c8b24

const docusignCred = {
    accountID: "1bc8a07a-5df6-4790-b6a9-c49ab46dd193",
    username: "tanujdd@gmail.com",
    password: "glass99!!",
    integratorKey: "10db488b-8b66-410c-bb4e-abc2208c8b24",
}

var fileUpload = require('express-fileupload'); 
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())
 
//routes
app.get('/upload', function(req, res){
    res.sendFile('index.html', { root: '.'});
});


let authorization_code = '';
let access_token = '';
let refresh_token = '';

app.post('/upload', function (req, res) {
    res.redirect('https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=10db488b-8b66-410c-bb4e-abc2208c8b24&redirect_uri=http://localhost:5000/upload')
    //console.log("This is URL ", req.body.tempName)

    var url = new URL(req.body.tempName);
    authorization_code = new URLSearchParams(url.search).get('code');
    //console.log("This is access token", authorization_code)

    getAccess();

    getUsers();
})

const getAccess = () => {
    
    // Exchange the authorization code with an access token by POST request on /oath/token
    var data = qs.stringify({
        'grant_type': 'authorization_code',
        'code': authorization_code 
    });

    // Integration + : + Secret converted to base64 and prefixed with "Basic"
    let str = '10db488b-8b66-410c-bb4e-abc2208c8b24' + ":" + "0b0427a6-e09f-446c-8761-c1e0b76e360d"
    let auth_header = Buffer.from(str).toString('base64')
    auth_header = "Basic " + auth_header;
    //console.log("This is auth_header " + auth_header)

    var config = {
        method: 'post',
        url: 'https://account-d.docusign.com/oauth/token',
        headers: { 
          'Authorization': auth_header, // auth_header here
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Cookie': '__RequestVerificationToken=ARlrEQtmxCzlAq8U-y-jacMB0'
        },
        data : data
      };


    // Untested
    axios(config)
    .then(function (response) {
        access_token = response.data.access_token;
        refresh_token = response.data.refresh_token;

        //console.log("This is access token " + access_token);
        //console.log("This is refresh token " + refresh_token);
    })
    .catch(function (error) {
        console.log(error);
    });
}


const getUsers = () => {
    // Make API call with the access_token
    access_token = "Bearer " + access_token;
    var config = {
        method: 'get',
        url: 'https://demo.docusign.net/restapi/v2.1/accounts/1bc8a07a-5df6-4790-b6a9-c49ab46dd193/users',
        headers: { 
          'Authorization': access_token
        }
      };


    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
}


var server = app.listen(5000, function() {
    console.log("Node server running")
})