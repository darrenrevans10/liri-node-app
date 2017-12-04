//variables that use NPM packages
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
//Node package for readfile
var fs = require("fs");

//variable to access the export keys
var keys = require("./keys.js");

//variable that grabs users preferred input
var input = process.argv[2];

//twitter information
var client = new twitter(keys.twitterKeys);
var params = {screen_name: 'LiriDeveloper'};

//spotify information
var spotify = new Spotify(keys.spotifyKeys);
//grabs users song input
var song = process.argv[3];

//switch to know which function user is searching for
switch(input) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		mySpotify();
		break;
	case "movie-this":
		myMovie();
		break;
	case "do-what-it-says":
		whatItSays();
		break;

}

//twitter function
function myTweets() {
	
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	//display 20 tweets with dates
	    for (var i = 0; i < tweets.length; i++) {
	    	console.log("\n" + tweets[i].created_at);
	    	console.log("Tweet: " + tweets[i].text + "\n");
	    }
	  }
	});
};

//spotify function
function mySpotify() {

	if (!song) {
  			console.log("\nPlease search a song name");
	} else {

	spotify.search({ type: 'track', query: song }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
 
 	//I have this loop set up in case I wanted to display more than 1 song
	for (var i = 0; i < 1; i++) {
		//display song information(artist, song name, album, preview url)
		var songInfo = data.tracks.items[i];
		console.log("\nArtist: " + songInfo.artists[0].name + "\nSong: " + songInfo.name + "\nAlbum: " + songInfo.album.name);
		
		if (songInfo.preview_url === "null") {
			console.log("No preview available");
		} else {
			console.log("Song Preview: " + songInfo.preview_url);
		}
	}
	});
	}
};

function myMovie() {

	var movieName = process.argv[3];
	
	if (!movieName) {
		movieName = "Mr. Nobody";
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {

		if (!error && response.statusCode === 200) {
			var movieInfo = JSON.parse(body)
			console.log("\nTitle: " + movieInfo.Title + "\nRelease Year: " + movieInfo.Year + "\nIMDb Rating: " + movieInfo.imdbRating
				+ "\nRotten Tomatoes Rating: " + movieInfo.Ratings[1].Value + "\nCountry Produced: " + movieInfo.Country 
				+ "\nLanguage: " + movieInfo.Language + "\nPlot: " + movieInfo.Plot + "\nActors: " + movieInfo.Actors);
		}

	});
};


//function that displays song information from random.txt
function whatItSays() {
	
	fs.readFile("random.txt", "utf8", function(err, data) {

		if (err) {
	   		return console.log(err);
		}

		//make an array that splits at the comma
		var songArr = data.split(",");

 		input = songArr[0];
 		song = songArr[1];
 		mySpotify();
	});

};