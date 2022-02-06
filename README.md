*init*
- 
- in `mkdir src`
- run `npm init -y` `npm i express pg sequelize axios`

*created src/ index.js  app.js utils/db.js*
- `mkdir src | cd src | touch index.js app.js | mkdir utils | cd utils | touch db.js`
- in src/index.js white
```js
const server = require('./app.js');
const conn = require('./db.js');

conn.sync({force:false}).then(()=>{
	server.listen(3001,()=>{
		console.log(`listening at 3001`);
		})
		});
```
- in src/app.js white
```js
const express = require('express');
const server = express();

server.use(express.json());	//lee json
server.use(express.urlencoded({extended:true}); //lee json post put
server.use((req,res,next)=>{
		res.setHeader('Access-Control-Allow-Origin','*');
		res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE');
		next();
		});

module.exports = server
```
- in src/utils/db.js white
```js
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host:process.env.DB_HOST,
		dialect:"postgres"
	}
);

module.exports = {conn:sequelize};
```
