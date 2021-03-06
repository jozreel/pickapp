
var path = require('path');
var ROOT = path.resolve(__dirname).slice(0,-7) ;
exports.viewpath = path.normalize(ROOT+'/application/view/');
exports.controlerpath = path.normalize(ROOT+'/application/controller/');
exports.publicpath = path.normalize(ROOT+'/public');
exports.defaultpage = 'index';
exports.defaultcontroler = "home";
exports.templatable = true;
exports.templateid='6';
exports.$_BASEURL = "http://localhost:1340";
exports.keys = path.normalize(ROOT+'/library/keys/');
exports.tmppath = path.normalize(ROOT+'/tmp/');
exports.host = "localhost";
exports.httpport = "1337";
exports.socketport = "1338";
exports.logpath = ROOT+'/library/log';
