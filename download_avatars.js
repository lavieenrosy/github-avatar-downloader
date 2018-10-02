var request = require('request');
var auth = require('./secrets.js')
var fs = require('fs');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

//function to get data from a specified repo owner and repo name

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'lavieenrosy',
      'Authorization': 'token ' + auth.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    return cb(err, JSON.parse(body));
  });
}

//function that takes in an image url and pipes it into the avatars folder

function downloadImageByURL(url, filePath) {
  return request.get(url).pipe(fs.createWriteStream(filePath));
}

//calling getRepoContributors and passing in an anonymous callback function to loop through a collection of avatars and pipe them into the avatars folder

getRepoContributors(repoOwner, repoName, function(err, result) {

  if (repoOwner) {
    for (var i = 0; i < result.length; i++) {
      var avatarURL = result[i].avatar_url;
      var avatarFolderFilePath = "avatars/" + result[i].login + ".jpg";
      downloadImageByURL(avatarURL, avatarFolderFilePath);
    }
  } else {
    console.log("Please specify a repo owner and repo name!")
  }
});
