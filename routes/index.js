const router = require('express').Router();
const {
    userRegister, loginUser
} = require('../controllers/users');
const { verifyUserData } = require('../middleware/checkToken');
router.post('/user-register', userRegister)
router.post('/login', loginUser)
router.use(verifyUserData)
router.use('/user', require('./users'));
module.exports = router;