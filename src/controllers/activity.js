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

