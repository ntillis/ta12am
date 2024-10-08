const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Tag = require('../models/Tag');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');


const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;

router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json( { message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch(error) {
        return res.status(401).json( { message: 'Unauthorized'});
    }
}



router.get('/login', async (req, res) => {
    try {

        res.render('admin/login', { layout: adminLayout });

    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body;
        
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json( { message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json( { message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userID: user._id }, jwtSecret )
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
    }
});


router.get('/dashboard', authMiddleware, async (req, res) => {

    try {

        const data = await Post.find();
        res.render('admin/dashboard', {
            data,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);
    }
});

router.post('/upload-image', upload.single('file'), (req, res) => {
    if (req.file) {
        const imageUrl = `/uploads/${req.file.filename}`
        res.json({ location: imageUrl });  // Correct response format
      } else {
        res.status(400).json({ error: 'Image upload failed' });
      }
});

router.get('/add-post', authMiddleware, async (req, res) => {
    try {
        const tags = await Tag.find();

        res.render('admin/add-post', {
            tags,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);
    }
});

router.post('/add-post', authMiddleware, async (req, res) => {
    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body,
                tags: req.body.tags
            });

            await Post.create(newPost);
            res.redirect('/dashboard');
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
});

// Edit
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {

        const data = await Post.findOne({ _id: req.params.id });

        res.render('admin/edit-post', {
            data,
            layout: adminLayout,
        })

    } catch (error) {
        console.log(error);
    }
});


router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });

        res.redirect(`/edit-post/${req.params.id}`);

    } catch (error) {
        console.log(error);
    }
});

router.delete('/edit-post/:postID/comments/:commentID', authMiddleware, async (req, res) => {
    try {
        let data = await Post.findById( { _id: req.params.postID });

        data.comments = data.comments.filter(comment => comment._id != req.params.commentID);
        await data.save();

        res.redirect(`/edit-post/${req.params.postID}`);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.deleteOne( { _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});

router.get('/logout', authMiddleware, async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


router.post('/register', async (req, res) => {
    try {

        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword});
            res.status(201).json({ message: 'User created', user});
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User already in use'});
            }
            res.status(500).json({ message: 'Internal Server Error' })
        }

    } catch (error) {
        console.log(error);
    }
});

router.post('/tags', async (req, res) => {
    try {

        const { name } = req.body;

        try {
            const tag = await Tag.create({ name });
            res.redirect("/add-post");
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'Tag already in use'});
            }
            res.status(500).json({ message: 'Internal Server Error' })
        }

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;