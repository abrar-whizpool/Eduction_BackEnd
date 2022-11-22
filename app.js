// Import Package
const express = require('express');
const bodyParser = require('body-parser');
const nodemailerFunctions = require('./nodemailer')
const cors = require('cors');

// Set Package
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({
        origin: '*'
    }));

// Server Start Notification
app.listen(5000, () => console.log("Server Started on port 5000..."));

// Get Index Page Request
app.get ('/', (req, res) => {
   console.log("hit")
});

// Post Email Request
app.post('/send', async(req, res) => {
        console.log(req.body.email);
        const accesstoken = await nodemailerFunctions.accessToken()
        console.log("accesstoken",accesstoken)
         await nodemailerFunctions.emailHandler(req.body.email, accesstoken,req.body)

          res.send({msg: true});
});


// {
//     client_id: '654673728608-k4hh8teaslu7u0dhtptlp3isktnh629v.apps.googleusercontent.com',
//     client_secret: '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',
//     refresh_token: '1//03n2jQgWKQNSzCgYIARAAGAMSNwF-L9IrfOz3UFwZaYIbx5xEKhwT9wMZnGC6iS9hMGJSJXjFpA8iDvDixZZivS9PiJCaNbImQIw',
//     grant_type: 'refresh_token'
//   }