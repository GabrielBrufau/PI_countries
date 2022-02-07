const activity = require('../controllers/activity.js');
const router = require('express').Router();

router                        
        .get('/', activity.getAll)
        .get('/id',activity.getOne)
        .post('/',activity.createOne);


module.exports = router;

