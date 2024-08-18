const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // HTTPS を使用
        secure: true,
        // XSS 対策
        httpOnly: true,
        // CSRF 対策
        sameSite: 'strict',
        // セッションの有効期限 (msec)
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use((req, res, next) => {
    Object.assign(req.session, {
        authenticated: true,
        uid: '7XhHkhmLYg3FRW3BdQXH',
    });
    next();
});

app.use('/users', require('./routes/users'));
app.use('/stamps', require('./routes/stamps'));
app.use('/profiles', require('./routes/profiles'));
app.use('/schedules', require('./routes/schedules'));
app.use('/subscribes', require('./routes/subscribes'));
app.use('/authentication', require('./routes/authentication'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.group('Internal Error');
    console.warn(err.message);
    console.error(req.app.get('env') === 'development' ? err : {});
    console.groupEnd();

    res.status(err.status || 500).send('Internal Error');
});

module.exports = app;
