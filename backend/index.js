const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elhioui001@gmail.com',
      pass: 'Hkkaskdasl@2019',
    },
  });

  const mailOptions = {
    from: 'Elhioui001@gmail.com',
    to: 'moadammari20@gmail.com',
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