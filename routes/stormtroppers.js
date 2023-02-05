const express = require('express')
const router = express.Router()
const mongoose = require('../db/mongoose')
const StormtropperController = require('../controllers/StormtroppersController')

const passport = require('passport')

router.get(
  '/',
  passport.authenticate('basic', { session: false }),
  StormtropperController.index
)

router.get(
  '/:id',
  passport.authenticate('basic', { session: false }),
  StormtropperController.show
)

router.post('/', StormtropperController.create)

router.put('/:id', StormtropperController.update)

router.delete('/:id', StormtropperController.destroy)

module.exports = router
