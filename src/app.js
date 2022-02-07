const express = require('express');
const server = express();

server.use(express.json());     //lee json
server.use(express.urlencoded({extended:true})); //lee json post put
server.use((req,res,next)=>{
                res.setHeader('Access-Control-Allow-Origin','*');
                res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE');
                next();
});

module.exports = server

