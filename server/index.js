require('dotenv').config() // env
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');// song song 2 host
const cookieParser = require('cookie-parser');

const authRouter = require('./routers/auth.router');
const bookRouter = require('./routers/book.router');
const borrowRouter = require('./routers/borrowBook.router')
const generalRouter = require('./routers/generalRouter.router')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'thuviensach'
});
connection.connect(function(err){
	if(err) throw err;
	else 
		console.log('MySQL Connected...');		
});
const app = express();
app.use(express.json());
app.use(cors())
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//connection to database
app.use(function(req, res, next) {
	req.conn = connection;
	next();
  });

app.use('/api/auth', authRouter)
app.use('/api/book', bookRouter)
app.use('/api/borrow', borrowRouter)
app.use('/api/general', generalRouter)

var port = process.env.PORT || 3001;
app.listen(port, function(){
	console.log("Server is running on port " + port);
});
