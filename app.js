const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = new express();
const port = 5000;

//database connection
require('./middleware/database')();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



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