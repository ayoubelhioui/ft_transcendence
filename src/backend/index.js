const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'ayoubelhioui@outlook.com',
      pass: '1234564789ayoubayoub',
    },
  });

  const mailOptions = {
    from: 'ayoubelhioui@outlook.com',
    to: 'klaarous@student.1337.ma',
    subject: 'Test Email',
    text: 'This is a test email sent from my application using Gmail SMTP.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error.message);
    } else {
      console.log('Email sent successfully!', info.response);
    }
});