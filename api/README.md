*init*
- 
- in `mkdir src`
- run `npm init -y` `npm i express pg sequelize axios`

*created src/ index.js  app.js utils/db.js*
- `mkdir src | cd src | touch index.js app.js | mkdir utils | cd utils | touch db.js`
- in src/index.js white
```js
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
                                           /:id GET ON getOne
                                                POST off
                                                PUT off
                                                DELETE off
        http://localhost:3001/api/activity      GET ON  getAll
                                           /:id GET ON  getOne
                                                POST ON createOne`);
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
```
- in src/app.js white
```js
const express = require('express');
const server = express();
require('./utils/relations.js');

server.use(express.json());     //lee json
server.use(express.urlencoded({extended:true})); //lee json post put
server.use((req,res,next)=>{
                res.setHeader('Access-Control-Allow-Origin','*');
                res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE');
                next();
});

module.exports = server

```
- in src/utils/db.js white
- documentacion <a href='https://www.youtube.com/watch?v=ssRNGCH8Jmw'>youtobe</a>

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
const Controllers_activity = require('../controllers/activity.js');
const router = require('express').Router();

const activity = new Controllers_activity();
router                        
        .get('/', (req,res,next)=>activity.getAll(req,res))
        .get('/:id',(req,res,next)=>activity.getOne(req,res))
        .post('/',(req,res,next)=>activity.createOne(req,res));


module.exports = router;
```
- in /PI_contries/src/routes/countries.js
```js
const Controllers_countries = require('../controllers/countries.js');
const router = require('express').Router();
 
const countries = new Controllers_countries;
console.log('#console contries',typeof countries) //objetc
console.log('#console contries.getAll',typeof countries.getAll) // function
console.log('#console countries.getAll()',typeof countries.getAll()) //object

router
        .get('/',(req,res,next)=>countries.getAll(req,res))
        .get('/:id',(req,res,next)=>countries.getOne(req,res));


module.exports = router;

```
- in /PI_countrie/src/controllers/activity.js
```js
const Activity = require('../models/activity.js');
const Countries = require('../models/countries.js');

class Controllers_activity{
        constructor(){}

 async getAll(req,res,next){
        try{
                const ALL = await Activity.findAll();
                return res.status(200).json(ALL);
        }catch (error){
                return res.status(500).json(error)
        }
 }
 async getOne(req,res,next){
        try{
                const ACTIVITY = await Activity.findOne({where:{name:req.query.name}});
                return res.status(200).json(ACTIVITY);
        }catch (error){
                return res.status(500).json(error);
        }
 }
async createOne(req,res,next){
        try{
                const MODEL_ACTIVITY = {
                        name:req.body.name,
                        difficulty:req.body.difficulty,
                        duration:req.body.duration,
                        season:req.body.season
                }
                const countries = req.body.countries;
                try{
                        const ACTIVITY_CREATED = await Activity.create(MODEL_ACTIVITY);
                        countries.forEach(async(el)=>{
                                let country = await Countries.findOne({where:{name:el}});
                                await ACTIVITY_CREATED.addCountries(country);
                        });
                        return res.status(201).json(ACTIVITY_CREATED);
                }catch (error){
                return res.status(500).json(error);
                }
        }catch (error){
                return res.status(500).json(error)
        }
 }
}
module.exports = Controllers_activity;

```
- in /PI_countrie/src/controllers/countries.js
```js
const Countries = require('../models/countries.js');

class Controllers_countries {
        constructor(){}

 async getAll(req,res,next){
        try{
                const ALL = await Countries.findAll();
                return res.status(200).json(ALL);
        }catch (error){
                return res.status(500).json(error)
        }
 }
 async getOne(req,res,next){
        try{
                const COUNTRIES = await Countries.findOne({where:{id:req.params.id}});
                return res.status(200).json(COUNTRIES);
        }catch (error){
                return res.status(500).json(error);
        }
 }
}
module.exports = Controllers_countries;
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
- in /PI_countrie/api/src/utils/relations.js
```js
const Countries = require('../models/countries.js');
const Activity = require('../models/activity.js')



console.log('#console Countries',Countries)
console.log('#console Activity ',Activity)
Countries.belongsToMany(Activity, { as:'relations', through: 'countryactivities'  });
Activity.belongsToMany(Countries, { as:'relations', through: 'countryactivities'  });
```

- in /PI_countries `sudo  docker-compose up --build`

- esto ya deberia conectar y correr normal en las rutas :D* chaoo putitos
