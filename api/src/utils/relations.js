const Countries = require('../models/countries.js');
const Activity = require('../models/activity.js')



console.log('#console Countries',Countries)
console.log('#console Activity ',Activity)
Countries.belongsToMany(Activity, { as:'relations', through: 'countryactivities'  });
Activity.belongsToMany(Countries, { as:'relations', through: 'countryactivities'  });

