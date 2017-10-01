var MonkeyLearn = require('monkeylearn');

class ML {
  constructor() {
    this.module_id = 'cl_qkjxv9Ly';
    this.apikey = '';
    this.ml = new MonkeyLearn(this.apikey);
    //this.apikey = '';
  }

  classify(tweets, callback) {
    var prob = new Array(tweets.length);
    var label = new Array(tweets.length);

    var promise = this.ml.classifiers.classify(this.module_id, tweets, false);

    promise.then((res) => {

      for (let i = 0; i < res.result.length; i++) {
        prob[i] = res.result[i][0]['probability'];
        label[i] = res.result[i][0]['label'];
      }
      callback(prob, label);
    });
  }
}

module.exports = ML;
