var request = require('request');
var auth = require('./secrets.js')
var fs = require('fs');

var avatarURL = "";
var avatarFolderFilePath = "";

console.log('Welcome to the GitHub Avatar Downloader!');

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

function downloadImageByURL(url, filePath) {
  return request.get(url).pipe(fs.createWriteStream(filePath));
}


getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);

  for (var i = 0; i < result.length; i++) {
    var avatarURL = result[i].avatar_url;
    var avatarFolderFilePath = "avatars/" + result[i].login + ".jpg";
    downloadImageByURL(avatarURL, avatarFolderFilePath);
  }

});
