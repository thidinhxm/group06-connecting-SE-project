const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const accountRouter = require('./routes/account');
const postRouter = require('./routes/post');
const requestRouter = require('./routes/request');
const passport = require('./middlewares/passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs.engine({
	extname: 'hbs',
	defaultLayout: 'layout',
	helpers: {
        ifStr(str1, str2, options) { if (str1 == str2) {
            return options.fn(this);
        }
        return options.inverse(this);
        }
    }
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { 
		maxAge: 1000 * 60 * 60 * 24 * 7,
	}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

app.use('/', indexRouter);
app.use('/', accountRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/requests', requestRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
