const Sequelize = require('sequelize');
//const Countries = require('../models/countries.js');
//const Activity = require('../models/activity.js')

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host:process.env.DB_HOST,
		dialect:"postgres"
	}
);

//Countries.belongsToMany(Activity, { through: 'Countries_Activity' });
//Activity.belongsToMany(Countries, { through: 'Countries_Activity' });


module.exports = {conn:sequelize};
