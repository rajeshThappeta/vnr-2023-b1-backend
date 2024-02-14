//create express app
const exp = require("express");
const app = exp();

//import mongo client
const mc=require('mongodb').MongoClient
//connect to mongodb server
mc.connect('mongodb://localhost:27017')
.then(client=>{
  //get database object
  const dbObj=client.db('vnrb1db')
  //get collection object
  const usersCollectionObj=dbObj.collection('userscollection')
  console.log("DB connction success")
})
.catch(err=>{
  console.log("DB connection error",err)
})


const userApp=require('./API/userApi')
const productApp=require('./API/productApi')



//if path starts with '/user-api', then forward req obj to userApp
app.use('/user-api',userApp)
//if path starts with '/product-api', then forward req obj to productApp
app.use('/product-api',productApp)

//use error handling middleware
app.use((err, req, res, next) => {
  res.send({ errMessage: err.message });
});

//assign port number
app.listen(4000, () => console.log("server running on 4000..."));
