const { Router } = require('express')
const routes = Router()
const DevelopersController = require('../controllers/DevelopersController')
const SearchController = require('../controllers/SearchController')


routes.get('/developers', DevelopersController.findAll)
routes.post('/developers', DevelopersController.create)
routes.get('/search', SearchController.findAll)

module.exports = routes