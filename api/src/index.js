const server = require('./app.js');
const {conn} = require('./utils/db.js');
const routes = require('./routes/index.js');
const Countries = require('./models/countries.js');
const axios = require('axios');

server.use('/api', routes);

( async ()=>{
try{
     await conn.sync({force:true}).then(()=>{
        console.log(`
        # server ON 
        http://localhost:3001/api/countries     GET ON getAll
        				   /:id	GET ON getOne
                                        	POST off
                                        	PUT off
                                        	DELETE off
	http://localhost:3001/api/activity	GET ON 	getAll
					   /:id	GET ON 	getOne
						POST ON	createOne`);
        server.listen(3001,async () => {
    	 const getApi = await axios.get("https://restcountries.com/v3/all")
	 const newbase = getApi.data.map( country => {
      				Countries.findOrCreate({
        				where: {
        				id: country.cca3,
        				name: country.name.common,
       	 				flag: country.flags[0],
        				continent: country.continents[0],
					capital: country.capital ? country.capital[0] : 'no capital',
        				subregion: country.subregion || null,
        				area: country.area,
        				population: country.population,
					},
				})
	})});

      });
}catch (error){
        console.error(error)
}
})()

