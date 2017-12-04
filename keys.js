
var input = process.argv[2];

if (!input || input !== "my-tweets" || input !== "spotify-this-song" || input !== "movie-this" || input !== "do-what-it-says") {
	console.log('Please search using "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says"');
} else {
	console.log('loading...');
}


var twitterKeys = {
  consumer_key: 'qJw4StqbrQSpqx9QBxJKNLVuE',
  consumer_secret: 'NoJ9m01aGaihAKYQg6jEpY55GHOgHI4TegiII6VnJu4GCegXnQ',
  access_token_key: '937453993068056576-7jPBtRhnqExLYhSwq2FONgEQbqRyfq8',
  access_token_secret: 'LD3w3MhcuIfgZHxkfpfFMmtfVsGxBTuhYMP3fT7WziOHe'
}

var spotifyKeys = {
  id: "31caad27dc8f45f09e1d7551ba47dd8c",
  secret: "bb6e5e0c86fd419cba9becb434648d17"
}

module.exports = {
	twitterKeys: twitterKeys,
	spotifyKeys: spotifyKeys
}