var cheerio = require('cheerio'),
    _ = require('underscore'),
    fs      = require('fs');

fs.readFile(process.argv[2], function (err, html) {
  var $ = cheerio.load(html),
      json = {},
      matches = [],
      weeks = [];

  $('.six.columns table tbody tr').each(function(i, elem) {
    var data = $(elem),
        score = data.children('.zentriert.hauptlink').text().trim();

    matches[i] = {};
    matches[i].home = data.children('.text-right.no-border-rechts.hauptlink').text();
    matches[i].away = data.children('.no-border-links.hauptlink').text();
    matches[i].home_score = score.substr(0, score.indexOf(':'));
    matches[i].away_score = score.substr(score.indexOf(':') + 1);
  });

  weeks = _.groupBy(matches, function(num, i) { return Math.floor(i/9); });

  fs.appendFile('output.json', JSON.stringify(weeks, null, 2), function(err) {
    console.log('output.json file successfully written!');
  });
});
