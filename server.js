var express = require('express'),
	stylus = require('stylus'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'develpoment';

var app = express();

function compile(str, path){
	return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile
	}
));
app.use(express.static(__dirname + '/public')); 

mongoose.connect('mongodb://localhost/meanTutorial');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
 	console.log('Mean Tutorial db opened');

 });

var Schema = mongoose.Schema;
var messageSchema = new Schema({
	message: String
});
var Message = mongoose.model('Message', messageSchema);

var mongoMessage;
Message.findOne(function (err, messageDoc) {
  console.log(messageDoc);
  mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function(req, res){
	res.render('partials/'+req.params.partialPath);
})

app.get('*', function(req, res){
	res.render('index', {
		mongoMessage : mongoMessage
	});
});

var port = 3030;
app.listen(port);
console.log('listening on port ' + port + '...');