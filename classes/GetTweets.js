var TwitterPackage = require('twitter'),
    moment         = require('moment');

class GetTweets {
  constructor(name) {
    this.secret = {
      consumer_key: '',
      consumer_secret: '',
      access_token_key: '',
      access_token_secret: ''
    };
    this.options = {
      screen_name: name,
      //since_id: 2017-08-22
      since_id: moment().subtract(7, 'days').format('DD-MMM-YYYY'),
      count: 10,
      filter: 'retweets'
    };
    this.Twitter = new TwitterPackage(this.secret);
  }

  getTweets(callback) {
    let creationDate = [];
    let tweets = [];
    let ids = [];
    this.Twitter.get('statuses/user_timeline', this.options, (err, data) => {
      data.forEach((tweet) => {
        creationDate.push(tweet['created_at'])
        tweets.push(tweet['text']);
        ids.push(tweet['id'])
      })

      callback(tweets, creationDate, ids);
    });
  }

}

module.exports = GetTweets;
