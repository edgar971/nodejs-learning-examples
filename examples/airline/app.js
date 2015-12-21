
module.exports = function(flightsData, db) {
    var express = require('express');
    var session = require('express-session');
    var MongoStore = require('connect-mongo')(session);
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var exphbs = require('express-handlebars');
    var passport = require('./auth');


    var routes = require('./routes/index')(flightsData,passport);

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('.hbs', exphbs({defaultLayout: 'single', extname:'.hbs'}));
    app.set('view engine', '.hbs');
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
        secret: 'airline',
        store: new MongoStore({
            mongooseConnection: db
        }),
        resave: true,
        saveUninitialized: true
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static('./node_modules'));
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Middleware
     */
    app.use(function (req,res,next) {
        console.log(req);
        res.set('X-Powered-By', 'Awesome Server');
        //Record Session History
        req.session.history = req.session.history || [];
        req.session.history.push(
            {
                date: Date(),
                url: req.url,
                method: req.method
            }
        );
        next();
    });
    app.use('/', routes);

    return app;
};
