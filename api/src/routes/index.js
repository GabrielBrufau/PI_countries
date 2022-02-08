const router = require('express').Router();
const countries = require("./countries.js");
const activity = require("./activity.js")


router.use("/countries", countries);
router.use("/activity", activity);


module.exports = router;
