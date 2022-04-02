const { Router } = require('express');
const router = new Router();
const Author = require('../models/author');

module.exports = router;

//Get
router.get('/', async(req, res)=>{
    let searchOptions = {};
    if(req.query.name != null && req.query.name != ''){
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', {authors: authors, searchOptions: req.query});
    } catch {
        res.redirect('/');
    }
});

router.get('/new', (req, res)=>{
    res.render('authors/new', {author: new Author()});
});


//Post
router.post('/', async(req, res)=>{
    const author = new Author({
        name: req.body.name
    });

    try {
        await author.save();
        res.redirect('authors');
    } catch (e) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        });
    }
});