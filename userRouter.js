const express = require('express')
const userController = require('./controller/userController')
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = userController

const router = express.Router()
router.route('/').get(getAllUsers).post(createUser).patch(updateUser)
router.route('/:id').get(getUser).delete(deleteUser)

module.exports = router