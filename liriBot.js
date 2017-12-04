var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var input = process.argv[2];

var client = new twitter(keys);
var params = {screen_name: 'LiriDeveloper'};

switch(input) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		mySpotify();
		break;
}

function myTweets() {
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    for (var i = 0; i < tweets.length; i++) {
	    	console.log("Tweet: " + tweets[i].text);
	    }
	  }
	});
};