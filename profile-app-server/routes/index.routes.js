const router = require('express').Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.json('All good in here');
});
router.get('/auth', (req, res, next) => {
  res.json('all good');
});

router.use('/', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
