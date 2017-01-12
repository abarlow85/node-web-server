const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')


app.use((req, res, next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);

	fs.appendFile('server.log', log+'\n')

	next();
});

// app.use((req, res, next) => {

// 	res.render('maintenance');

// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('<h1>Hello, Express!</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to this page',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'My Projects'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'BAD ROUTE'
	});
});

app.listen(PORT, () => {
	console.log('Server is on port', PORT)
});