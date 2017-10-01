var express       = require('express'),
    cors          = require('cors'),
    app           = express(),
    port          = process.env.PORT || 3000,
    mongoose      = require('mongoose'),
    getTweets     = require('./main.js'),
    TweetModel    = require('./models/tweetModel.js'),
    EmailModel    = require('./models/emailModel.js'),
    emailValidate = require('./emails/emailValidate');
    email         = require('./emails/email.js')
    cron          = require('node-cron');


app.use(cors());
app.listen(port);


mongoose.connect('mongodb://user:password@ds157584.mlab.com:57584/trumpstweets', {
  useMongoClient: true
});

cron.schedule('* * * * * 1', () => {
  email();
});

app.get('/', (req, res) => {
  res.send('Can get /  😀');
})

app.get('/posts', (req, res) => {
  TweetModel.find({}, (err, items) => {
    if (err) {console.log(err);}
    else{
        res.send(items);
    }
});
});



app.get('/posts/remove/:id', (req, res) => {
  EmailModel.findByIdAndRemove(req.params.id, (err) => {
    if (err) {console.log(err);}
    res.send('Successfully Removed You From Mailiing List');
  });
});


app.get('/posts/:email', (req, res) => {
  var holder = {
    email: req.params.email,
  }

  EmailModel.create( holder, (err, newItem) => {
    emailValidate(newItem);
    res.send('success');
    if(err) {console.log(err);}
  });
});
