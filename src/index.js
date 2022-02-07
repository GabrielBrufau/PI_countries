const server = require('./app.js');
const {conn} = require('./utils/db.js');
const routes = require('./routes/index.js');

server.use('/api', routes);

( async ()=>{
try{
        await conn.sync({force:false});     
        console.log(`
        # server ON 
        http://localhost:3001/api/countries     GET ON
        					GET ON
                                        	GET off
                                        	POST ON
                                        	PUT off
                                        	DELETE off
	http://localhost:3001/api/activity	GET ON 	getAll
					   /:id	GET ON 	getOne
						POST ON	createOne`);
        server.listen(3001);
}catch (error){
        console.error(error)
}
})()

