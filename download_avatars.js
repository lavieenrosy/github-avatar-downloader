var request = require('request');
var auth = require('./secrets.js')

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
    cb(err, JSON.parse(body));
  });
}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);


  for (var i = 0; i < result.length; i++) {
    console.log(result[i].avatar_url);
  }



});