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
                        name:req.body.name,
                        flag:req.body.flag,
                        continent:req.body.continent,
			capital:req.body.capital,
			subregion:req.body.subregion,
			area:req.body.area,
			population:req.body.population
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

