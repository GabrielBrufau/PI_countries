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

*creatd controllers routes models Dokerfile .dockerignore docker-compose.yml*
- in /PI_contries `touch Dockerfile .dockerignore docker-compose.yml`
- in /PI_contries/src `mkdir routes controllers models`
- in /PI_contries/src/routes `touch index.js activity.js countries.js`
- in /PI_countrie/src/controllers `touch activity.js countries.js`
- in /PI_countrie/src/models `touch activity.js countries.js`

- in /PI_countries/Dockerfile
```Dockerfile
ROM node:12-alpine

WORKDIR /src

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node","src/index.js"]
```

- in /PI_countries/.dockerignore
```.dockerignore
node_modules
```

- in /PI_countries `sudo docker build -t pi_countries .`

- in /PI_countries/docker-compose.yml
```yml
version: "2.2"

services:      
        db:
                image: "postgres:12"
                ports:
                        - "5432:5432"
                environment:
                        POSTGRES_USER: pi_countries
                        POSTGRES_PASSWORD: 12345
                        POSTGRES_DB: db_name_countries
                volumes:
                        - db:/var/lib/postgresql/data

        src:
                container_name: pi_countries
                image: pi_countries
                build:
                        context: .
                depends_on:
                        - db
                ports:
                        - "3001:3001"
                environment:
                        DB_HOST: db
                        DB_PORT: 5432
                        DB_USER: pi_countries
                        DB_PASSWORD: 12345
                        DB_NAME: db_name_countries
                links:
                        - db
                volumes:
                        - ".:/PI_countrie"
                        - "/PI_countrie/node_modules"
volumes:
        db: {}

```
- in /PI_countries `sudo  docker-compose up --build`
- in /PI_contries/src/routes/index.js
```js
const router = require('express').Router();
const countries = require("./countries.js");
const activity = require("./activity.js")



router.use("/countries", countries);
router.use("/activity", activity);

module.exports = router;
```
- in /PI_contries/src/routes/activity.js
```js
const activity = require('../controllers/activity.js');
const router = require('express').Router();

router
	.get('/', activity.getAll)
	.get('/id',activity.getOne)
	.post('/',activity.createOne);


module.exports = router;

```
- in /PI_contries/src/routes/countries.js
```js
const countries = require('../controllers/countries.js');
const router = require('express').Router();

router
        .get('/', countries.getAll)
        .get('/id',countries.getOne)
        .post('/',countries.createOne);


module.exports = router;


```
- in /PI_countrie/src/controllers/activity.js
```js
const Activity = require('../models/activity.js');

exports.getAll = async (req,res,next)=>{
	try{
		const ALL = await Activity.findAll();
		return res.status(200).json(ALL);
	}catch (error){
		return res.status(500).json(error)
	}
}

exports.getOne = async (req,res,next)=>{
	try{
		const ACTIVITY = await Activity.findByPk(req.params.id);
		return res.status(200).json(ACTIVITY);
	}catch (error){
		return res.status(500).json(error);
	}
}

exports.createOne = async (req,res,next)=>{
	try{
		const MODEL_ACTIVITY = {
			name:req.body.name,
                        difficulty:req.body.difficulty,
                        duration:req.body.duration,
                        season:req.body.season
		}
		try{
			const ACTIVITY_CREATED = await Activity.create(MODEL_ACTIVITY);
			console.log('console# user created',ACTIVITY_CREATED);
			return res.status(201).json(ACTIVITY_CREATED);
		}catch (error){
		return res.status(500).json(error);
		}
	}catch (error){
		return res.status(500).json(error)
	}
}
```
- in /PI_countrie/src/controllers/countries.js
```js
const Countries = require('../models/countries.js');

exports.getAll = async (req,res,next)=>{
        try{
                const ALL = await Countries.findAll();
                return res.status(200).json(ALL);
        }catch (error){
                return res.status(500).json(error)
        }
}
exports.getOne = async (req,res,next)=>{
        try{
                const COUNTRIES = await Countries.findByPk(req.params.id);
                return res.status(200).json(COUNTRIES);
        }catch (error){
                return res.status(500).json(error);
        }
}
exports.createOne = async (req,res,next)=>{
        try{
                const MODEL_COUNTRIES = {
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.password
                }
                try{
                        const COUNTRIES_CREATED = await Countries.create(MODEL_COUNTRIES);
                        console.log('console# user created',COUNTRIES_CREATED);
                        return res.status(201).json(COUNTRIES_CREATED);
                }catch (error){
                return res.status(500).json(error);
                }
        }catch (error){
                return res.status(500).json(error)
        }
}

```
- in /PI_countrie/src/models/activity.js
```js
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
```
- in /PI_countrie/src/models/countries.js
```js
const Sequelize = require('sequelize');
const {conn} = require('../utils/db.js');

const Countries = conn.define('countries',{
    id: { 
      type: Sequelize.INTERGER,
      autoIncrement:true,
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

```
in /PI_countrie/src/index.js
```js
const server = require('./app.js');
const {conn} = require('./utils/db.js');
const routes = require('./routes/index.js');


server.use('/api', routes);

( async ()=>{
try{
	await conn.sync({force:false});
	console.log(`
	# server ON 
	http://localhost:3001/api/activity 	GET ON
	http://localhost:3001/api/countries 	GET ON
				    		GET ON
				    		POST ON
						PUT ON
						DELETE off`);
	app.listen(3001);
}catch (error){
	console.error(error)
}
})()
```

- in /PI_countries `sudo  docker-compose up --build`
- esto ya deberia conectar y correr normal en las rutas
