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
