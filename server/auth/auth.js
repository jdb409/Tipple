const router = require('express').Router()
const User = require('../models/User')
module.exports = router

router.get('/me', (req, res, next) => {

  User.findById(req.session.userId)
    .then(user => {
      res.send(user);
    })
})

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.session.userId = user.id;
        res.send(user);
      }
    })
    .catch(next)
})



router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      console.log('before', req.session.userId)
      req.session.userId = user.id;
      console.log('after', req.session.userId)
      res.send(user);
    })
    .catch(next);
})

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

// router.use('/google', require('./google'))