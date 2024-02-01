const nodemailer = require('nodemailer');
const userModel = require('../models/Users');
const jwt = require("jsonwebtoken");
const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "api",
      pass: "095dbc968f098e9e51e08714d876d1e8",
    },
  });
const createVerifyEmail = async(req,res)=>{
    const {userId,emailPay} = req.body;

    try {
        const payload = {
            userId,
            }

            const options = {
            expiresIn : "5m"
            };

    const token = jwt.sign(payload, process.env.SECRET, options);
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"BinToPay" <support@bintopay.com>',
            to: 'usfaql@gmail.com',
            subject: 'Email Verification',
            text: `Please click the following link to verify your email: http://localhost:3000/verify/${token}`,
            html: `<p>Please click the following link to verify your email: <a href='http://localhost:3000/verify/${token}'>Verify Email</a></p>`,
          });
        
          console.log('Message sent: %s', info.messageId);
          res.status(201).json('Verification email sent');
    } catch (error) {
        console.log(error);
    }
            
};


const verifyEmail = (req,res)=>{
    const {userId, emailPay} = req.body;
    const token = req.params.token;
    console.log("Email PayPal:" , emailPay);
    jwt.verify(token, process.env.SECRET, (err, result) => {
        if (err) {
          res.status(403).json({
            code: 403,
            success: false,
            message: `The token is invalid or expired`,
          });
        } else {
          console.log(result);
          if (result.userId  === userId) {
          // Assuming the token is valid, you can send a success response
          userModel.findOneAndUpdate({ _id: userId }, 
          { emailPay: emailPay }, 
          { new: true }).then((result)=>{
            console.log("result", result);
            res.status(201).json({ message: 'Email verified successfully'});
          })
        } else {
          // If the token is missing or invalid, you can send an error response
          res.status(400).json({ error: 'Invalid token' });
        }
        }
      });
    
}

module.exports = {
    createVerifyEmail,
    verifyEmail
}
