const express=require('express');
const app=express();
const db=require('./db.js');
const itemsConnection = require('./db.js').itemsConnection;
console.log("i am running❤️")

const bodyParser=require('body-parser');
app.use(bodyParser.json())

app.get('/',function(req,res){
    res.send("hello CUSTORME WELCOME IN MUSKAN'S")
})



const personRoutes =require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes=require('./routes/menuRoutes.js');
app.use('/items',menuRoutes);

app.listen(3000,()=>{
    console.log("the side is running on port 3000")
})