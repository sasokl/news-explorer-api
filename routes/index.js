const router = require('express').Router();

const auth = require('../middlewares/auth');
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const articlesRoutes = require('./articles');

router.use('/', authRoutes);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/articles', articlesRoutes);

module.exports = router;
