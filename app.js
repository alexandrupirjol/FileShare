var express = require('express');
var mustache = require('mustache');
var util = require('util');
var mongodb = require('mongodb');
var client = mongodb.MongoClient;

var auth = {
	user: 'root',
	pass: '17011985',
	host: 'paulo.mongohq.com',
	port: 10033,
	name: 'socialfileshare'
}
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
		}
	}
})

var app = express();


app.listen(3000);
console.log('Listening on port 3000');