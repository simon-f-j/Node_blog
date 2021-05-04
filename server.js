const express = require('express')
const mongoose = require('mongoose')
var multer  = require('multer')
const path = require('path')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')

const app = express()



mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.use(express.static('static'))

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'))




app.get('/',async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', { articles: articles })
})











app.use('/articles',articleRouter)


app.listen(5000)