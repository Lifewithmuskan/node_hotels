const express=require('express')
const routes=express.Router();
const Menuitems =require('./../models/Menuitems.js')


routes.get('/',async(req,res)=>{
    try{
        const data= await Menuitems.find();
        console.log('data is fetch ');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})



routes.post('/',async(req,res)=>{
    try{
      const data=req.body
      const items= new Menuitems(data);
      const response=  await items.save();
      console.log('item are saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server Error'});
    }
})

routes.get('/:Taste',async(req,res)=>{
  try{
    const Taste=req.params.Taste;
    if(Taste=="sweet" || Taste=="sour"|| Taste=="spicy"){
      const response = await Menuitems.find({taste:Taste});
      console.log('respose fetched');
      res.status(200).json(response)
    }
    else{
      res.status(404).json({error:'invalid taste'});
    }

  }
  catch(err){
     console.log(err);
     res.status(500).json({error:'not able to fetch taste!!'});
  }
})

routes.put('/:id',async(req,res)=>{
  try {
    const menuid= req.params.id;
    const menudata= req.body;

    const menuupadteddata= await Menuitems.findByIdAndUpdate(menuid,menudata,{
      new:true,
      runValidators:true
      
    });

    if(!menuupadteddata){
      res.status(404).json({error:'the id is invalid'});
    }
    res.json(menuupadteddata)
  } 
  catch (error) {
    console.log(err)
    res.status(500).json({error:'updation is not done'})
  }
})

routes.delete('/:id',async(req,res)=>{
try{
  const itemid= req.params.id;

  const itemdelete = await Menuitems.findByIdAndDelete(itemid);
  
  if(!itemdelete){
    res.status(404).json('id id is invalid');
  }
  res.json({error:'the items delete sccuessful'})
}
catch(err){
   console.log(err)
   res.status(500).json({error:'the deletion is not done due to an error'})
}
});
//Comment for testing purpose
module.exports=routes;