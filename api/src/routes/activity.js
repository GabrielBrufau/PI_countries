const Controllers_activity = require('../controllers/activity.js');
const router = require('express').Router();

const activity = new Controllers_activity();
router                        
        .get('/', (req,res,next)=>activity.getAll(req,res))
        .get('/:id',(req,res,next)=>activity.getOne(req,res))
        .post('/',(req,res,next)=>activity.createOne(req,res));


module.exports = router;

