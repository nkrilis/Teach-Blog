const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

const withAuth = require('../../utils/auth');

router.post('/comment', withAuth, async (req, res) =>
{
    try
    {
      const dbCommentData = await Comment.create(req.body);

      res.status(200).json(dbCommentData);

    }
    catch(err)
    {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) =>
{
  try
  {
    const dbPostData = await Post.findAll({
      where: { user_id: req.session.user_id }
    });

    const postData = dbPostData.map((data) => data.get({ plain: true }));

    res.render('dashboard', {
      postData,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });


  }
  catch(err)
  {
    res.status(500).json(err);
  }

});

router.post('/create', withAuth, async (req, res) => 
{
  try
  {
    const dbPostData = await Post.create(req.body);

    res.status(200).json(dbPostData);

  }
  catch(err)
  {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/update/:id', withAuth, async (req, res) =>
{
  try
  {
    const dbPostData = await Post.findByPk(req.params.id);

    const postData = dbPostData.get({ plain: true });



    res.status(200).render('updatePost', {
      postData,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });

  }
  catch(err)
  {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/update/:id', withAuth, async (req, res) => 
{
  try
  {
    const dbPostData = await Post.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {id: req.params.id}
      });

    res.status(200).json(dbPostData);

  }
  catch(err)
  {
    console.log(err);
    res.status(500).json(err);
  }
});


// Home signup route
router.post('/', async (req, res) => {
    try 
    {
      const dbUserData = await User.create(req.body);
    
      req.session.save(() => 
      {
        req.session.loggedIn = false;
  
        res.status(200).json(dbUserData);
      });
  
    } 
    catch (err) 
    {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // Login route
  router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          user_name: req.body.user_name,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = dbUserData.id;
  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // Logout route
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;

