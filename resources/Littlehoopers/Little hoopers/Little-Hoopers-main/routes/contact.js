const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router(); 


router.post('/submit-form.php', (req, res) => {
  const { name, email, message, phonenumber } = req.body;

  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'midwdx@gmail.com', //Pls replace with your email
      pass: 'kmyo moms incb nlun' 
    }
  });

  
  const mailOptions = {
    from: email,
    to: 'midwdx@gmail.com', // Pls replace with your email
    subject: 'Little Hoopers',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nPhone Number: ${phonenumber}`
  };

  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false });
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('http://localhost:3000/contact.html');
    }
  });
});

module.exports = router;
