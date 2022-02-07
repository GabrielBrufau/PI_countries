const countries = require('../controllers/countries.js');
const router = require('express').Router();
   
router
        .get('/', countries.getAll)
        .get('/id',countries.getOne)
        .post('/',countries.createOne);


module.exports = router;

