var GetTweets     = require('./classes/GetTweets.js'),
  TweetAnalysis   = require('./classes/TweetAnalysis.js'),
  TweetModel      = require('./models/tweetModel.js'),
  emailModel      = require('./models/emailModel.js'),
  fs              = require('fs'),
  mongoose        = require('mongoose');

var Tweet = new GetTweets('realdonaldtrump');
var TweetAnalysis = new TweetAnalysis();

function interpoltate(probability) {
  return (Math.floor(probability / 0.2) + 1);
}

function getTweets(callback) {
  let result = [];
  console.log('loading tweets')
  Tweet.getTweets((tweets, date, ids) => {
    console.log(tweets.length, 'tweets loaded, classifying')
    TweetAnalysis.classify(tweets, (prob, label) => {
      for (let i = 0; i < tweets.length; i++) {
          result.push({
            content: tweets[i],
            label: label[i],
            prob: prob[i],
            date: date[i],
            id: ids[i],
            rating: interpoltate(prob[i])
          });
      }

      callback(result);
    });
  })
}
