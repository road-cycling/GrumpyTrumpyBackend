var getTweets     = require('../classes/GetTweets'),
    emailModel    = require('../models/emailModel'),
    sgMail        = require('@sendgrid/mail'),
    mongoose      = require('mongoose');


sgMail.setApiKey('');

mongoose.connect('mongodb://user:password@ds157584.mlab.com:57584/trumpstweets', {
  useMongoClient: true
});

var Tweet = new getTweets('realdonaldtrump');

function CreateMessage(callback) {
  let plainText = '',
      htmls = '';
  Tweet.getTweets((tweets, date, id) => {
    for (let i = 0; i < tweets.length; i++) {
      htmls += "<h4 style='font-family: Arial; color: #606060'; text-align: center> @realdonaldtrump " + date[i].slice(0, 10) + "</h4> \n <hr> \n";
      htmls += "<p style='font-family: Arial'; color: black; text-align: center> " + tweets[i] + " </p> \n";
      htmls += "<br><br>";
      plainText += "@realdonaldtrump " + date[i] + " \n";
      plainText += " " + tweets[i] + "  \n";
      plainText += "\n\n";

      if (i == tweets.length - 1){
          return callback(plainText, htmls);
      }
    }
  })
}

function create() {
  CreateMessage((ptext, fhtml) => {
      emailModel.find({}, (err, items) => {

        if(err) {console.log(err);}
        else {
          items.forEach((item) => {
            console.log(item._id);
            var msg = {
              to: item['email'],
              from: 'DonaldTrump@TheWhiteHouse.com',
              subject: 'Sending with SendGrid is Fun',
              text: ptext,
              html: fhtml + "\n\n <a href='www.grumpytrumpy.net/posts/remove/'" + item._id + ">UnSubscribe</a>"
            };
            sgMail.send(msg);
          });
        }
      }, () => {console.log('success');});
  });
}


module.exports =  create;
