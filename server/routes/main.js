const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Mailer = require('../models/Mailer')
const Tag = require('../models/Tag')


router.get('', async (req, res) => {
    try {
        const data = await Post.aggregate([ { $sort: { createdAt: -1 }}]).limit(5).exec();

        const tags = await Tag.find().limit(3);

        res.render('index', { 
            data,
            tags
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/search/all-blogs', async (req, res) => {
    try {
        const data = await Post.find();

        res.render('all-blogs', {
            data
        })
    } catch (error) {
        console.log(error);
    }
});

router.get('/search/all-tags', async (req, res) => {
    try {
        const tags = await Tag.find();

        res.render('all-tags', {
            tags
        })
    } catch (error) {
        console.log(error);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });
        res.render('post', { 
            data
        })
    } catch (error) {
        console.log(error);
    }
});

router.get('/about', (req, res) => {
    try {
        res.render('about');
    } catch (error) {
        console.log(error);
    }
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/search/tags/:name', async (req, res) => {
    try {
        const tagName = req.params.name;
        const tag = await Tag.findOne({ name: tagName });

        const posts = await Post.find({ tags: tag._id });

        res.render("tag", {
            tagName,
            posts,
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/post/:id/comment', async (req, res) => {
    try {
        const comment = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        }
        
        let slug = req.params.id;
        const data = await Post.findById({_id: slug});

        data.comments.push(comment);

        await data.save();

        res.redirect(`/post/${req.params.id}`);

    } catch (error) {
        console.log(error);
    }
}); 

module.exports = router;