var express = require('express');
var server = express();
var fs = require('fs');
var serverPort = process.env.OPENSHIFT_NODEJS_PORT || 8080
var serverAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var img_folder = __dirname + '/public/img/';
// use readdirSync because async returns undefined
// returns array of filenames
var img_list = fs.readdirSync(img_folder, function(err, fileList) {
  console.log(err);
});
var img_list_end = img_list.length - 1;

server.disable('x-powered-by');
server.set('views', __dirname + '/views');
server.set('view engine', 'ejs');

server.use(express.static(__dirname + '/public'));

function imgUpdate(item, way) {
  var nextImg = '';
  if (way === 'prev') {
    if (img_list.indexOf(item) > 0) {
      nextImg = img_list[img_list.indexOf(item) - 1];
    }
    else {
      nextImg = img_list[img_list_end];
    }
  }
  else if (way === 'next') {
     if (img_list.indexOf(item) < img_list_end) {
      nextImg = img_list[img_list.indexOf(item) + 1];
    }
    else {
      nextImg = img_list[0];
    }
  }
  console.log('img index: ' + img_list.indexOf(nextImg));
  console.log('img value: ' + nextImg);
  return nextImg;
}
 
server.listen(serverPort, serverAddress, function () {
  console.log("Listening on " + serverAddress + " on port " + serverPort)
});

server.get('/getPhoto', function(req, res) {
  console.log(req.query.img);
  console.log(req.query.way);
  res.send(imgUpdate(req.query.img, req.query.way));
});

server.get('*', function(req, res) {
  res.render('index.ejs');
});

// for url taking variables from url params
//server.get('/:id', function(req, res) {
//  console.log(typeof req.params);
//  res.send(req.params);
//});