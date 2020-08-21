const debug = require('debug')('filter:index')
const moment = require('moment');
moment.locale('zh-hk');

exports.getUrl = getUrl;
exports.getContent = getContent;
exports.getDate = getDate;
exports.getTitle = getTitle;
exports.parseDate = parseDate;
exports.nullVerify = nullVerify;
exports.parseContent = parseContent;
/**
 * 
 * @param {Object} result 
 * @param {string} name 
 */
function getUrl(result, name) {
  switch (name) {
    default:
      return result['link-href'];
      //data via search engine
      break;
  }
}
/**
 * 
 * @param {Object} result 
 * @param {string} name 
 */
function getContent(result, name) {
  switch (name) {
    default:
      return result['content'];
      break;
  }
}
/**
 * 
 * @param {Object} result 
 * @param {string} name 
 * @return string
 */
function getDate(result, name) {
  switch (name) {
    case 'news_thaicn':
      return result['link-href'];
      break;
    default:
      return result['date'];
      //data via search engine
      break;
  }
}
/**
 * 
 * @param {Object} result 
 * @param {string} name 
 */
function getTitle(result, name) {
  switch (name) {
    default:
      return result['title'];
      //data via search engine
      break;
  }
}
/**
 * 
 * @param {Object} result 
 * @param {string} name 
 * if pass @return true 
 * otherwise @return false
 */
function nullVerify(result, name) {
  let isNullDate = !getDate(result, name);
  let isNullContent = !getContent(result, name);
  let isNullTitle = !getTitle(result, name);
  if (isNullContent || isNullDate || isNullTitle) {
    return false;
  }
  return true;
}

function parseDate(result, name) {
  let date = getDate(result, name);
  let reg = /.*/g;
  debug("date raw %s", date);
  const mNameThai = {
    "มกราคม": '01',
    "กุมภาพันธ์": '02',
    "มีนาคม": '03',
    "เมษายน": '04',
    "พฤษภาคม": '05',
    "มิถุนายน": '06',
    "กรกฎาคม": '07',
    "สิงหาคม": '08',
    "กันยายน": '09',
    "ตุลาคม": '10',
    "พฤศจิกายน": '11',
    "ธันวาคม": '12'
  };
  const mNameCn = {
    "一月": '01',
    "二月": '02',
    "三月": '03',
    "四月": '04',
    "五月": '05',
    "六月": '06',
    "七月": '07',
    "八月": '08',
    "九月": '09',
    "十月": '10',
    "十一月": '11',
    "十二月": '12'
  }
  const mNameAbbr = {
    "Jan": '01',
    "Feb": '02',
    "Mar": '03',
    "Apr": '04',
    "May": '05',
    "Jun": '06',
    "Jul": '07',
    "Aug": '08',
    "Sep": '09',
    "Oct": '10',
    "Nov": '11',
    "Dec": '12'
  };
  const mNameID = {
    "Januari": '01',
    "Februari": '02',
    "Maret": '03',
    "April": '04',
    "Mei": '05',
    "Juni": '06',
    "Juli": '07',
    "Agustus": '08',
    "September": '09',
    "Oktober": '10',
    "November": '11',
    "Desember": '12'
  }
  switch (name) {
    case 'news_thaiembbeij':
      date = date.replace(',', ' ');
      date = date.replace(/ +/, ' ');
      date = date.replace('\b', '');
      date = date.replace('\t', '');
      date = date.split(' ');
      let thaiTranslated =  mNameThai[date[0]];
      if(!(!thaiTranslated)) {
        date[0] = thaiTranslated;
        date = date.join('-');
      }else{
        date[0] = mNameCn[date[0]];
        date = date.join('-');
      }
      break;
    case 'news_medcom':
      date = date.split(' ');
      date[1] = mNameID[date[1]];
      date = date.join('-');
      break;
    case 'news_khmer':
      date = date.replace(',', '日');
      date += '年';
      break;
    case 'news_udn':
      date = date.replace(',', '');
      if (date.match(/\w+/)) {
        date = date.replace(',', '');
        date = date.split(' ');
        date[1] = mNameAbbr[date[1]];
        date = date.join('-');
        break;
      }
      break;
    case 'news_hhua':
      date = date.replace(',', '');
      date = date.split(' ');
      date[0] = mNameAbbr[date[0]];
      date = date.join('-');
      break;
    default:
      reg = /(\d{4}([.\-/ ])\d{1,2}\2\d{2}|\d{2}([.\-/ ])\d{2}\3\d{4}|\d{4}年\d{1,2}月\d{1,2}日|\d{1,2}月\d{1,2}日\d{4}年)/g
      break;
  }
  try {
    let extract = date.match(reg)[0];
    debug("date after processing %O " + extract);
    console.log(extract);
    result['date'] = moment(extract, ['MMDDYYYY', 'YYYYMMDD', "DDMMYYYY"]).format('L');
  } catch (error) {
    console.error('Error Occured When parsing date');
    console.error(error);
  }
}

function parseContent(result, name) {
  switch (name) {
    default:
      break;
  }
  result['content'] = getContent(result, name).replace('\n', '');
  //for csv splitling..
  result['content'] = getContent(result, name).replace(',', '');
}
