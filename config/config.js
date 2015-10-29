
var path = require('path');
var ROOT = path.resolve(__dirname).slice(0,-7) ;
exports.viewpath = path.normalize(ROOT+'/application/view/');
exports.controlerpath = path.normalize(ROOT+'/application/controller/');
exports.publicpath = path.normalize(ROOT+'/public');
exports.defaultpage = 'index';
exports.defaultcontroler = "admin";
exports.templatable = true;
exports.templateid='6';
exports.$_BASEURL = "http://localhost:1337";