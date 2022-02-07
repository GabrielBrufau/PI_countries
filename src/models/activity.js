const Sequelize = require('sequelize');
const {conn} = require('../utils/db.js');

const Activity = conn.define('activity',{
    name: {                            
      type: Sequelize.STRING,        
    },
    difficulty: {
        type: Sequelize.ENUM('Realy Easy', 'Easy', 'meddium', 'Hard','Realy Hard')
    },
    duration: {
        type: Sequelize.STRING
    },
    season: {
        type: Sequelize.ENUM("Summer", "Autumn", "Winter", "Spring")
    }
});
module.exports = Activity;
