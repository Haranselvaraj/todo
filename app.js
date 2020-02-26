var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
require('dotenv').config();
var todocontroller = require('./controllers/todocontroller');

var app = express();

app.set('view engine','ejs');

app.use(express.static('./public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('dev'))

todocontroller(app);

app.listen(process.env.PORT || 3000, ()=>{console.log('Server is running!');
});

