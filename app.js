const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('./config')
const csrf = require('csurf');

const app = new express();
const port = 5000;
const store = new MongoDBStore({
  uri: config.MONGODB_URL,
  collection:'session'
});

const csrfProtection = csrf();
//database connection
require('./middleware/database')();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret:'my secret',
  resave:false,
  saveUninitialized:false,
  store:store
}));

app.use(csrfProtection);

app.use((req, res, next)=>{
  res.locals.isAuthenticated=req.session.isAuthenticated,
  res.locals.sessionUser=req.session.user,
  res.locals.csrfToken= req.csrfToken(),
  next();
})

// declaring ejs as the templete engine to use
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))


// routing the files
const frontViews = require('./routes/front-view');
const adminViews = require('./routes/admin');
app.use(frontViews);
app.use('/admin', adminViews);


// listins section
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });