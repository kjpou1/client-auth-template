/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(urlToQuery) {
  let url = urlToQuery;
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * https://github.com/jfromaniello/url-join/blob/master/lib/url-join.js
 * @param {*} args
 * @returns normalized URL string
 */
function normalize(args) {
  const strArray = args;
  const resultArray = [];
  if (strArray.length === 0) { return ''; }

  if (typeof strArray[0] !== 'string') {
    throw new TypeError(`Url must be a string. Received ${strArray[0]}`);
  }

  // If the first part is a plain protocol, we combine it with the next part.
  if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
    const first = strArray.shift();
    strArray[0] = first + strArray[0];
  }

  // There must be two or three slashes in the file protocol, two slashes in anything else.
  if (strArray[0].match(/^file:\/\/\//)) {
    strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
  } else {
    strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
  }

  for (let i = 0; i < strArray.length; i += 1) {
    let component = strArray[i];

    if (typeof component !== 'string') {
      throw new TypeError(`Url must be a string. Received ${component}`);
    }

    if (component !== '') {
      if (i > 0) {
      // Removing the starting slashes for each component but the first.
        // eslint-disable-next-line no-useless-escape
        component = component.replace(/^[\/]+/, '');
      }
      if (i < strArray.length - 1) {
      // Removing the ending slashes for each component but the last.
        // eslint-disable-next-line no-useless-escape
        component = component.replace(/[\/]+$/, '');
      } else {
      // For the last component we will combine multiple slashes to a single one.
        // eslint-disable-next-line no-useless-escape
        component = component.replace(/[\/]+$/, '/');
      }

      resultArray.push(component);
    }
  }

  let str = resultArray.join('/');
  // Each input component is now separated by a single slash except the
  // possible first plain protocol part.

  // remove trailing slash before parameters or hash
  str = str.replace(/\/(\?|&|#[^!])/g, '$1');

  // replace ? in parameters with &
  const parts = str.split('?');
  str = parts.shift() + (parts.length > 0 ? '?' : '') + parts.join('&');

  return str;
}

export function combineURLs(...args) {
  return normalize(args);
}
