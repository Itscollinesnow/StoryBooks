const path = require ('path')
const express = require ('express')
const dotenv = require ('dotenv')
const morgan =require ('morgan')
const exphbs = require ('express-handlebars') 
const passport = require ('passport')
const session = require ('express-session')
const connectDB = require ('./config/db')

//load config 
dotenv.config({path: './config/config.env'})

//Passport Config 
require ('./config/passport')(passport)

//intialize app & middleware
const app = express()

//logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
//handlerbars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// session middleware
app.use(session({
    secret: 'Books',
    resave: false,
    saveUninitialized: false,
  }));

//Passport middleware
app.use (passport.initialize());
app.use (passport.session())

//static folders
app.use (express.static(path.join(__dirname, 'public')))

//routes

app.use ('/', require('./routes/index'))
app.use ('/', require('./routes/auth'))

//connect DB 
connectDB()


//listening server
const PORT = process.env.PORT || 3500

app.listen( 
    PORT, 
    console.log( `Server is running ${process.env.NODE_ENV} mode on ${PORT}`) 
    );
