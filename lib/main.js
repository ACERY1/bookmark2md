// const applescript = require('applescript');
// const exp2bookmarkCode = require('./export2bookmark');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const json2md = require('json2md');

// run appleScript
// const runAppleScript = (cptString) => {
//   applescript.execString(cptString, function(err, rtn) {
//     if (err) {
//       throw new Error(err)
//     }
//     console.log('success!');
//   });
// }

// convert
const _convert2JSON = () => {
  fs.existsSync(path.resolve(process.cwd(), './bookmark.html'));
  const fileString = fs.readFileSync('./bookmark.html').toString();
  const $ = cheerio.load(fileString);
  let obj = {};
  Array.from($('H3')).forEach(item => {
    let key = $(item).text();
    obj[key] = {};
    Array.from($(item).next('DL').children('DT').children('a')).forEach(it => {
      let k = $(it).text().replace(/\s*/g, "");
      let v = $(it).attr('href');
      obj[key][k] = v;
    })
  })
  return obj;
}

// convert2MD
const _convert2MD = () => {
  fs.existsSync(path.resolve(process.cwd(), './bookmark.html'));
  const fileString = fs.readFileSync('./bookmark.html').toString();
  const $ = cheerio.load(fileString);
  let MDArray = [];
  Array.from($('H3')).forEach(item => {
    let key = $(item).text();
    MDArray.push({'h3': key})
    let ulArray = [];
    Array.from($(item).next('DL').children('DT').children('a')).forEach(it => {
      let k = $(it).text().replace(/\s*/g, "");
      let v = $(it).attr('href');
      ulArray.push(`${k}：${v}`);
    })
    MDArray.push({ul: ulArray});
  })
  return MDArray;
}

module.exports = (arg) => {
  if (['md', 'json'].indexOf(arg) === -1) {
    throw new Error(`file format params error, must be 'md' or 'json'`);
  }
  if (arg === 'md') {
    let mdArray = _convert2MD();
    fs.writeFileSync(path.resolve(process.cwd(), './output.md'), json2md(mdArray))
  }
  if (arg === 'json') {
    let jsonObj = _convert2JSON();
    fs.writeFileSync(path.resolve(process.cwd(), './output.json'), JSON.stringify(jsonObj, null, 4))
  }
}