const express = require('express');
const path = require('path');




const app = new express();

const port = 5000;

// declaring ejs as the templete engine to use
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))


// routing the files
app.get('/', (req, res,next)=>{
  res.render('index',{
    title:'Madiora-Home'
  })
})

app.get('/contact',(req, res, next)=>{
  res.render('contact',{
    title:'Madiora-Contact'
  })
})

// listins section
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})