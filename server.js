const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine', 'hbs');
//app.use(express.static(__dirname + '/public')); ==> move under maintenance middleware


app.use((req, res, next) => {
	
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unale to append to server.log');
		}
	});
	
	next();
	
});

//app.use((req, res) => {
//	
//	res.render('maintenance.hbs');
//	
//});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	
	//res.send('<h1>Hello Express!</h1>');
	
//	res.send({
//		
//		name: 'Momo',
//		likes: [
//			'Cat',
//			'Chocolate',
//			'Noodle'
//		]
//	});
	
	res.render('home.hbs', {
		pageTitle: 'Homepage',
		welcomeMessage: 'Welcome to my website',
	});

});

app.get('/about', (req, res) => {
	
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
	
});

app.get('/portfolio', (req,res) => {
	
	res.render('portfolio.hbs');
	
});

app.get('/bad', (req,res) => {
	
	res.send({
		errorMessage: 'Unable to handle request'
	});
	
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});