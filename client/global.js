'use strict';

let Firebase = require('firebase');
let range = require('lodash/utility/range');
let activeSport = __SPORT__;
let activeYear = __YEAR__;
let years = range(2012, parseInt(activeYear, 10) + 1).map(String);


// These are all things that will only change once a year
// All the year stuff is based on the build step
module.exports = {
    activeSport,
    activeYear,
    // Meant to look like a regex using a test method
    rYear: {test: (year) => years.indexOf((year || '').toString()) > -1},
    years: years,
    staticUrl: 'https://cdn.rawgit.com/tweetyourbracket/api/6d84c44c991d8250515047655d2a8ed1ae19ee9d/data-static/ncaa-mens-basketball',
    apiUrl: 'http://104.236.223.8',
    firebase: new Firebase('https://tweetyourbracket.firebaseio.com')
};