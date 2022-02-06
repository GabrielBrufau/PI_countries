const server = require('./app.js');
const conn = require('./utils/db.js');

conn.sync({force:false}).then(()=>{
        server.listen(3001,()=>{
                console.log(`listening at 3001`);
	})
});
