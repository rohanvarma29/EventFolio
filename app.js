const express= require('express');
const ejs= require('ejs');
const morgan = require('morgan');
const connectionRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoutes');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

//configure app
const app=express();
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
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// set up routes

app.use('/',mainRoutes);

app.use('/connections',connectionRoutes);

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

