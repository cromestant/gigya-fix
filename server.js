var gig = require('./gigyainfo.json');
var gigya_secret = gig.apikey;
var gigya_apikey=gig.secret;

data = require("./ids");
var https=require('https');
mine = Object.create(data.ids);
var success = "";
var error = "';"

var fs = require('fs');

//console.log(mine.next()),console.log(mine.next()),console.log(mine.next()),console.log(mine.next())
var express = require('express');
var app = express();

app.get('/', function(req, res){
    var id = mine.next();
    options ={
        hostname: 'gcs.gigya.com',
        port: 443,
        path: '/socialize.deleteAccount?format=json&apikey='+gigya_apikey+'&secret='+gigya_secret+'&UID='+id,
        method: 'GET',
        
    };
    console.log(id);
    console.log(options.path);
    https.get(options, function(resp) {
        resp.setEncoding('utf8');
      console.log("Got response: " + resp.statusCode);
      if (resp.statusCode =="200"){
          //success+=","+id;
          resp.on('data', function(d) {
              var parsed = JSON.parse(d);
              if(parsed.statusCode ==200){
                  console.log("sirvio");
                  success+=","+id;
              }else{
                  console.log("no sirvio")
                   error +=","+id;
              }
              console.log(d);
            });
      }
      else{
          error +=","+id;
      }
      res.send('OK');
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
       error +=","+id;
       res.send(500,'NO OK');
    });
});

app.get('/close', function(req, res){
    fs.writeFile('errors.txt',error,function err(error){});
    fs.writeFile('successes.txt',success,function err(error){});
    res.send("OK, files written");
});


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});