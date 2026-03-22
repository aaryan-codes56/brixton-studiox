const nodemailer = require('nodemailer');

const user = 'brixtonstudiox@gmail.com';
const pass = 'nlrguzezbpscxvkh';

const t = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: { user, pass },
  tls: {
    rejectUnauthorized: false
  }
});

t.verify()
  .then(() => {
    console.log("Success! App password works.");
  })
  .catch((err) => {
    console.error("Failed!", err.message);
  });
