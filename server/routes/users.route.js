const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller')

router.get('/user/:userId', userController.get)
router.get('/users', userController.list)
router.post('/user', userController.create)
router.put('/user/:userId', userController.update);

// soft delete
router.put('/user/dis/:userId',userController.disable) 

// hard delete
router.delete('/user/del/:userId', userController.remove)

module.exports = router