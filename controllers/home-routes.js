const router = require('express').Router();
const { User, Post, Comment } = require('../models');

const withAuth = require('../utils/auth');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  router.get('/signup', (req, res) => 
  {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

router.get('/', async (req, res) => 
{
    try
    {
        const dbPostData = await Post.findAll({
            include: 
            [
                {
                    model: User,
                    attributes: ['user_name'],
                }
            ],
        });

        const postData = dbPostData.map((data) => data.get({ plain: true }));

        // res.status(200).json(postData);
        res.render('homepage', {
            postData,
            loggedIn: req.session.loggedIn,
          });
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => 
{
    try
    {
        const dbPostData = await Post.findByPk(req.params.id, {
            include:
            [
                {
                    model: User,
                    attributes: ['user_name'],
                },
            ]
        });

        const postData = dbPostData.get({ plain: true });

        const dbCommentData = await Comment.findAll({
            where: { user_id: dbPostData.id },
            include: {
                model: User,
                attributes: ['user_name']
            },
        });

        const commentData = dbCommentData.map((data) => data.get({ plain: true }));

        // res.status(200).json(dbCommentData);

        res.render('postDetails', {
            postData,
            commentData,
            loggedIn: req.session.loggedIn,
        });

    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

module.exports = router;