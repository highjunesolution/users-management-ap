const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller')

router.get('/user/:userId', userController.get)
router.get('/users', userController.list)
router.post('/user', userController.create)
router.put('/user/:userId', userController.update);

// soft delete
router.put('/user/:userId',userController.disable) 

module.exports = router