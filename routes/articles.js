const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
var multer  = require('multer')



const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './static/profile_pics')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '--'+ file.originalname)
    }
  })
  
  
const upload = multer({ storage: fileStorageEngine })
  
  
  
  
  
router.post("/single", upload.single("image"),(req, res) => {
    console.log(req.file);
})






router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article()})
})


router.get('/:id', async (req,res) => {
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})







router.get('/edit/:id', async (req,res) =>{
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('articles/edit', {article: article})
})


router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})



router.put('/:id',upload.single("image"), async (req,res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticle('new'))


router.post('/', upload.single("image"), async (req, res, next) =>{
  req.article = new Article()
  next()
}, saveArticle('new'))











function saveArticle(path) {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.text = req.body.text
      try {
      article.image = req.file.filename
      }
      catch(e) {article.image = 'default.png'}

      try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
      } catch (e) {
        res.render(`articles/${path}`, { article: article })
      }
    }
  }


module.exports = router