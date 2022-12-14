
const nodemailer = require('nodemailer');
const axios = require('axios').default
const qs = require('qs')
const {ApplyJobEmail,contactUsHandler} = require('./emailHandler')


exports.emailHandler = (async (email,access_token,body) => {
    try {
        console.log("email : ",email )
        let emailbody =''
        let emailSubject =''
        if(body.emailType === 'job'){
          console.log("job")
          emailbody = ApplyJobEmail(body)
          emailSubject = 'Application For Job'
        }else{
          emailbody = contactUsHandler(body)
          emailSubject = 'Contact Us Request'
        }
        console.log("HANDLER got here")
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'yakuzaronn513@gmail.com',
              clientId: '654673728608-k4hh8teaslu7u0dhtptlp3isktnh629v.apps.googleusercontent.com',
              clientSecret: "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"              ,
              refreshToken: '1//03WePNZxz-nsmCgYIARAAGAMSNwF-L9IrTXDSpTKVHaEbqtyGFjeoplRLnw_dLn75v4f7iOhiLqvwpAXTAJyqN1uvi8ihISXVe6o',
               accessToken: access_token,
            },
          });

        var mailOptions = {
            from: 'yakuzaronn513@gmail.com',
            to: 'yakuzaronn513@gmail.com' ,
            subject: emailSubject  || '',
            html:emailbody
        };
        console.log(mailOptions)
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error==>", error);
                throw new Error('Error! Please Enter Valid Email Address');
            } else {

                console.log('Email sent: ' + info.response);
                return res.status(200).json({
                    success: true, message: "Email Sent Successfully.Please Check Your Email for verification Code"
                })
            }
        });


    } catch (error) {

        throw new Error(error);
    }
})

exports.accessToken = (async () => {
    let response;
    const config = {
      method: 'post',
      url: 'https://accounts.google.com/o/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({ 
        clientId: '654673728608-k4hh8teaslu7u0dhtptlp3isktnh629v.apps.googleusercontent.com',
        clientSecret: "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"              ,
        refreshToken: '1//03WePNZxz-nsmCgYIARAAGAMSNwF-L9IrTXDSpTKVHaEbqtyGFjeoplRLnw_dLn75v4f7iOhiLqvwpAXTAJyqN1uvi8ihISXVe6o',
        grant_type: 'refresh_token'
     }),
    };
    try {
    
      // console.log('createAccessToken : ', requestData);
      response = (await (await axios(config))?.data) || '';
    } catch (error) {
      console.error('createAccessToken :', error.message);
    }
    return response.access_token.toString();
})
 