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
