const Sequelize = require('sequelize');
const {conn} = require('../utils/db.js');
console.log('#console conn',conn);
const Countries = conn.define('countries',{
    id: { 
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,      
    },  
    name: {
      type: Sequelize.STRING,
      allowNull: false, 
      unique: false,
    },
    flag: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    continent: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    capital: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subregion: {
      type: Sequelize.STRING,
    }, 
    area: {
      type: Sequelize.INTEGER,
    },
    population: {
      type: Sequelize.INTEGER,
    }
});
module.exports = Countries;

