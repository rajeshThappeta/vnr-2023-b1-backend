//create mini-express app
const exp=require('express')
const productApp=exp.Router();



//Product api routes
productApp.get('/products',(req,res)=>{
    res.send({message:"All products"})
})




//export productApp
module.exports=productApp;