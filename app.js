var express = require('express');
var cors = require('cors')
const axios = require('axios')
var app = express();
var bodyParser = require('body-parser')
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
// redirect http://localhost
// integration 10db488b-8b66-410c-bb4e-abc2208c8b24


const docusignCred = {
    accountID: "1bc8a07a-5df6-4790-b6a9-c49ab46dd193",
    username: "tanujdd@gmail.com",
    password: "Computers99!!",
    integratorKey: "10db488b-8b66-410c-bb4e-abc2208c8b24",
}

var fileUpload = require('express-fileupload'); 
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true })); 

//routes
app.get('/', function(req, res){
    res.sendFile('index.html', { root: '.'});
});


app.get('/upload', function (req, res) {
    // console.log(req.files.myFile);
    console.log("This is req.body: " + req.body)
    res.redirect('https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=10db488b-8b66-410c-bb4e-abc2208c8b24&redirect_uri=http://localhost:5000')
    
});


// var config = {
//     method: 'get',
//     url: 'https://demo.docusign.net/restapi/v2.1/accounts/1bc8a07a-5df6-4790-b6a9-c49ab46dd193/users',
//     headers: { 
//       'Authorization': 'Bearer eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwAAZ5kFDVHZSAgAAKe8E1BR2UgCAN5jIazYnbtGiDIlcKT0fB4VAAEAAAAYAAEAAAAFAAAADQAkAAAAMTBkYjQ4OGItOGI2Ni00MTBjLWJiNGUtYWJjMjIwOGM4YjI0IgAkAAAAMTBkYjQ4OGItOGI2Ni00MTBjLWJiNGUtYWJjMjIwOGM4YjI0MAAAoDMiCVHZSDcAbA6PgfuHo0-N8npEOy5lhw.uJkG3thVIiFeYdcQkjUYPH28luh4-IU92M8jEiK7wtpVhWKEn2126nWaq1orFG-fB3uVqFhErRzzrnJ6R9sE3zLuAoiVVhiwppGiNZZJIh4jfZMaePvXoNlkpDfveV7m-VUHWmmKPLTLNSeICXikVF7ryisv_4Mj8-OX4Xk38JfkoykzaCj9dLK8wUXbuwTN3BQIuNgPhIYu5x4hkVbXtadMPNjkUuBb2wtbKMBdSaXvHN_uzS8S_d8asnTAK3tWz0XzKn4X3G066ob0Cu55j1hhKW_8kReWRxOVyTgEelOX65wJrLiVSvAL3IXEtlbVP2nc85_j-XYqAJGepPYLlQ'
//     }
//   };
  
//   axios(config)
//   .then(function (response) {
//     //console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     //console.log(error);
//   });














//   var code = 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAUABwCAyzuk0lHZSAgAgAtfshVS2UgCAN5jIazYnbtGiDIlcKT0fB4VAAEAAAAYAAEAAAAFAAAADQAkAAAAMTBkYjQ4OGItOGI2Ni00MTBjLWJiNGUtYWJjMjIwOGM4YjI0IgAkAAAAMTBkYjQ4OGItOGI2Ni00MTBjLWJiNGUtYWJjMjIwOGM4YjI0EgABAAAACwAAAGludGVyYWN0aXZlMACA6kWe0lHZSDcAbA6PgfuHo0-N8npEOy5lhw.1qverAHfaoX2vAt8pYQabZdA-WVm2lTG_5N71WSjMQTorq-07hbJmaXl9JtQICpO2n3CBiiUMnxWN6OTWTqU2mw3umQUkZ_I-Rib_fE6_SZaN3bpXOi07WJYQKjfd-DQAwUnaOk57A1uiumTSCMe6VExNnQDfJISs6w3vKG9wt6mYOY4iV_LVLwQMtxAqaoUkdn2800virSrYB0zcklzyt3ldSZMArP7NlZ-LgK1qC4Z0yz0C0s8aZmE5fjSIOQYHZZ6V1UlVzNzQpfS9nnP0CPMXfkBm7sh7kAT5gXh8BC6X96s2V7By8QxVfPlRdNLpB26t3-HvDupoeabt0fPFQ'
//   //console.log("This is the api call for authorization URI " + docAPI.ApiClient.getAuthorizationUri(docusignCred.integratorKey, 'signature', 'http://localhost', "code"));

//   var apiClient = new docusign.ApiClient( {
//       basePath: restApi.BasePath.PRODUCTION,
//       oAuthBasePath: oAuth.BasePath.PRODUCTION
//   })

//     apiClient.generateAccessToken(docusignCred.integratorKey, '0b0427a6-e09f-446c-8761-c1e0b76e360d', code).then(function(oAuthToken) {
        
//         assert.equal(err, undefined);
//         assert.notEqual(oAuthToken, undefined);
//         assert.notEqual(oAuthToken.accessToken, undefined);
//         assert.ok(oAuthToken.expiresIn > 0);

//         console.log(oAuthToken);


//         apiClient.getUserInfo(oAuthToken.accessToken)
//           .then(function(userInfo){
//             assert.equal(err, undefined);
//             assert.notEqual(userInfo, undefined);
//             assert.notEqual(userInfo.accounts, undefined);
//             assert.ok(userInfo.accounts.length > 0);
//             console.log("UserInfo: " + userInfo);
//             // parse first account's basePath
//             // below code required for production, no effect in demo (same
//             // domain)
//             apiClient.setBasePath(userInfo.accounts[0].baseUri + "/restapi");
//             return done(oAuthToken)
//           })
//           .catch(function(err){
//             return done(err);
//           });
//     })


var server = app.listen(5000, function() {
    console.log("Node server running")
})