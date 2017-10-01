var   sgMail        = require('@sendgrid/mail');
      emailModel    = require('../models/emailModel.js'),
      mongoose      = require('mongoose');

sgMail.setApiKey('');

function createSendEmail(item) {
  var msg = {
    to: item['email'],
    from: 'DonaldTrump@TheWhiteHouse.com',
    subject: 'You Have Subscribed!!',
    text: ' click here -> www.google.com',
    html: "<a href='www.grumpytrumpy.net/posts/remove/'" + item._id + ">UnSubscribe</a>"
  };

  sgMail.send(msg);
}

module.exports = createSendEmail;
