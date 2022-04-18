const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const tokenValidation = require('../middleware/tokenValidation')

router.post('/signup', userController.createUser)

router.post('/login', userController.loginUser)

router.post(
  '/profile',
  tokenValidation.validateToken,
  userController.getUserProfile
)

router.put(
  '/profile',
  tokenValidation.validateToken,
  userController.updateUserProfile
)

router.post(
  '/transaction',
  tokenValidation.validateToken,
  userController.getUserTransactions
)

router.post(
  /^\/transaction\/TS\d{4}-\d{4}$/,
  tokenValidation.validateToken,
  userController.getUserTransactionID
)

module.exports = router

