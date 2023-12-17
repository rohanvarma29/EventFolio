const express= require('express');
const ejs= require('ejs');
const morgan = require('morgan');
const connectionRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

//create app
const app=express();

//configure app
let port=8080;
let host='localhost';
let url = 'mongodb://localhost:27017/NBAD';

//connect to MongoDB
mongoose.connect(url)
.then(()=>{
    //start the server
    app.listen(port,host);
    console.log('app is running at port',port);
})
.catch(err=>console.log(err.message));

app.set('view engine','ejs');

// mount middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/NBAD'}),
        cookie: {maxAge: 60*60*1000}
        })
);

app.use(flash());

app.use((req, res, next) => {
    // if(!req.session.counter)
    //     req.session.counter=1;
    // else
    //     req.session.counter++;
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// set up routes

app.use('/',mainRoutes);
app.use('/connections',connectionRoutes);
app.use('/users',userRoutes);

app.use((req,res,next)=>{
    let err = new Error('The server cannot locate '+req.url);
    err.status=404;
    next(err);
});

app.use((err,req,res,next)=>{
    console.log(err.stack); 
    if(!err.status){
        err.status=500;
        err.message='Internal server error';
    }
    res.status=err.status;
    res.render('error',{error: err});
});

