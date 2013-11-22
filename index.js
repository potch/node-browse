var os = require('os');
var spawn = require('child_process').spawn;
var urlparse = require('url');

function valid(url) {
  var parsed = urlparse.parse(url);
  var protocol = parsed.protocol.toLowerCase();
  if (protocol === 'http:' || protocol === 'https:') {
    return true;
  }
  return false;
}

function open(url) {
  switch(os.platform()) {
    case 'darwin':
      spawn('open', [url]);
      break;
    case 'linux':
      spawn('xdg-open', [url]);
      break;
    case 'win32':
      spawn('start', [url]);
      break;
  }
}

exports.openURL = function openURL(url) {
  if (valid(url)) {
    open(url);
  } else {
    console.warn('invalid protocol');
  }
}