const express=require('express');
const routes=express.Router();
const Person =require('./../models/Person.js');
const { message } = require('prompt');

routes.post('/',async(req,res)=>{
    try{
      const data=req.body
      const newPerson= new Person(data);
      const response=await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})

routes.get('/',async(req,res)=>{
    try{
        const data= await Person.find();
        console.log('data is fetch ');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})

routes.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef'|| workType=='manger'||workType=='waiter'){
        
        const response=await Person.find({work:workType});
        console.log('response fetched');
        res.status(200).json(response)
        }
        else{
            res.status(404).json({error:'Interval work type'})
        }
    }catch(err){
       console.log(err);
       res.status(500).json({error:'Internal server '})
    }
});

routes.put('/:id',async(req,res)=>{
    try{
       const personid=req.params.id;
       const updatedperson=req.body;

       //assuming you have person model
       const updatedpersondata=await Person.findByIdAndUpdate(personid,updatedperson,{
        new:true,
        runValidators:true
       });
       if(!updatedpersondata){
        return res.status(404).json({error:'person not found in this id'});
       }
       res.json(updatedpersondata)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server '})
    }
});

routes.delete('/:id',async(req,res)=>{
    try{
      const workid= req.params.id;

      const persondata=  await Person.findByIdAndDelete(workid);

      if(!persondata){
        return res.status(404).json({error:'invalid id, so that person not found'});
      }
      res.json({message:'person delete successfuly'});
    }
    catch(err){
         console.log(err)
         res.status(500).json({error:'person deletion is failed'});
    }
});


module.exports=routes;