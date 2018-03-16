'use strict';

/**
 * @param {array} rules
 * @param {string} filepath
 * @param {number} strongMax
 * @return
 */
module.exports = function(rules = [], file = 'index.html', strongMax = 15) {
  console.log('Begin checking ...');
  console.log('rules: ' + ((rules.length === 0) ? 'no rules' : rules.join(',')));
  console.log('file: ' + file);

  const cheerio = require('cheerio');
  const fs = require('fs');

  const htmlString = fs.readFileSync(file).toString();
  const $ = cheerio.load(htmlString);
  // console.log('html: ' + $.html());

  for (let r of rules) {
    let num = 0;
    switch (r) {
      case 1:
        if ($('img').length === 0) {
          num = -1;
        } else {
          $('img').each(function(i, elem) {
            if ($(this).attr('alt') === undefined) num++;
          });
        }
        if (num > 0) {
          console.log('Rule-1: There are ' + num + ' <img> tag without alt attribute');
        } else {
          console.log('Rule-1: <img> checked and passed!')
        }
        break;
      case 2:
        if ($('a').length === 0) {
          num = -1;
        } else {
          $('a').each(function(i, elem) {
            if ($(this).attr('rel') === undefined) num++;
          });
        }
        if (num > 0) {
          console.log('Rule-2: There are ' + num + ' <a> tag without rel attribute');
        } else {
          console.log('Rule-2: <a> checked and passed!')
        }
        break;
      case 3:
        if ($('head').find('title').length > 0) {
          console.log('Rule-3: In head <title> checked and passed!')
        } else {
          console.log('Rule-3: The header doesn\'t have <title> tag');
        }
        if ($('head').find('meta[name="description"]').length > 0) {
          console.log('Rule-3: In head <meta name="description"> checked and passed!')
        } else {
          console.log('Rule-3: The header doesn\'t have <meta name="description"> tag');
        }
        if ($('head').find('meta[name="keywords"]').length > 0) {
          console.log('Rule-3: In head <meta name="keywords"> checked and passed!')
        } else {
          console.log('Rule-3: The header doesn\'t have <meta name="keywords"> tag');
        }
        break;
      case 4:
        if (strongMax < 0) strongMax = 0; // fix logic is wrong when no strong tag
        if ($('strong').length > strongMax) {
          console.log('Rule-4: This HTML have more than ' + strongMax + ' <strong> tag');
        } else {
          console.log('Rule-4: <strong> ' + strongMax + ' max checked and passed!')
        }
        break;
      case 5:
        if ($('H1').length > 1) {
          console.log('Rule-5: This HTML have more than one <H1> tag');
        } else {
          console.log('Rule-5: <H1> checked and passed!')
        }
        break;
      default:
        console.log('Rule ' + r + ' is not defined!');
    }
  }

  return;
};
