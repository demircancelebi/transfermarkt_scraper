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
        home = data.children('.text-right.no-border-rechts.hauptlink').text(),
        away = data.children('.no-border-links.hauptlink').text(),
        posRegex = /\((\d+).\)/g,
        score = data.children('.zentriert.hauptlink').text().trim(),
        homePos = posRegex.exec(home) || '',
        awayPos = posRegex.exec(away) || '';

    matches[i] = {};
    matches[i].home = home.replace(posRegex, '').trim();
    matches[i].away = away.replace(posRegex, '').trim();
    matches[i].home_pos = homePos[1];
    matches[i].away_pos = awayPos[1];
    matches[i].home_score = score.substr(0, score.indexOf(':'));
    matches[i].away_score = score.substr(score.indexOf(':') + 1);
  });

  weeks = _.groupBy(matches, function(num, i) { return Math.floor(i/9); });

  fs.appendFile('output.json', JSON.stringify(weeks, null, 2), function(err) {
    console.log('output.json file successfully written!');
  });
});
