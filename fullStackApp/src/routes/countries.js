const Controllers_countries = require('../controllers/countries.js');
const router = require('express').Router();
 
const countries = new Controllers_countries;
console.log('#console contries',typeof countries) //objetc
console.log('#console contries.getAll',typeof countries.getAll) // function
console.log('#console countries.getAll()',typeof countries.getAll()) //object

router
        .get('/',(req,res,next)=>countries.getAll(req,res))
        .get('/:id',(req,res,next)=>countries.getOne(req,res));


module.exports = router;

