var express = require('express');
var mustache = require('mustache');
var util = require('util');
var mongodb = require('mongodb');
var client = mongodb.MongoClient;
var fs = require('fs');

var auth = {
	user: 'root',
	pass: '17011985',
	host: 'paulo.mongohq.com',
	port: 10033,
	name: 'socialfileshare'
};
var mongoURI = util.format('mongodb://%s:%s@%s:%d/%s',
	auth.user, auth.pass, auth.host, auth.port, auth.name);

client.connect(mongoURI, {auto_reconect: true}, function(err, database){
	if(err)	throw err;
	else{
		if(!database){
			console.log("Unknown error connecting to database");
		}else{
			console.log('Connected to MongoDB database server at:');
            console.log('\n\t%s\n', mongoURI);
            console.log(database.find);
            app.get('/', function(req, res){
                var slug =[req.params.slug][0] || 'index'; // grab the page slug
                console.log(slug);
                var rData = {records: {}}; // wrap the data in a global object... (mustache starts from an object then parses)
                var page = fs.readFileSync('./templates/'+slug+'.html', "utf8"); // bring in the HTML file
                var html = mustache.to_html(page, rData); // replace all of the data
                res.send(html); // send to client
            });
        }
    }
});

var app = express();


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});