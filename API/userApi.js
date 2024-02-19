//create mini-express app
const exp = require("express");
const userApp = exp.Router();
const bcryptjs=require("bcryptjs")
const jsonwebtoken=require('jsonwebtoken')

let usersCollectionObj;
userApp.use((req, res, next) => {
  usersCollectionObj = req.app.get("usersCollectionObj");
  next();
});

//body parser middleware
userApp.use(exp.json());

//user api(routes)

//create user
userApp.post("/new-user", async (req, res) => {
  
  //get user resource from req
  const newUser=req.body;
  //check duplicate user by username
  const dbUser=await usersCollectionObj.findOne({username:newUser.username})
  //if user already existed
  if(dbUser!==null){
    res.send({message:"Username has  already taken"})
  }else{
    //hash the password
    const hashedPassword=await bcryptjs.hash(newUser.password,6)
    //replace plain pw with hased pw
    newUser.password=hashedPassword;
    //save user
    await usersCollectionObj.insertOne(newUser)
    //send res
    res.send({message:"User created"})
  }

  });



//user login
userApp.post('/login',async(req,res)=>{
  //get user crdentials obj
  const userCredObj=req.body;
  //verify username
  const dbUser=await usersCollectionObj.findOne({username:userCredObj.username})
  //if dbuser is null
  if(dbUser===null){
    res.send({message:"Invalid Username"})
  }//if username is valid
  else{
   const status=await bcryptjs.compare(userCredObj.password,dbUser.password)
   //if passwords are not matched
   if(status===false){
    res.send({message:"Invalid password"})
   }//if passwords are also matched
   else{
      //create JWT token
      const signedToken=jsonwebtoken.sign({username:dbUser.username},'sdgahjdgajshdga',{expiresIn:20})
      //send token to client as res
      res.send({message:"login success",token:signedToken})
   }
  }
})











//get all users
userApp.get("/users", async (req, res) => {

  //get all users
  const usersList = await usersCollectionObj.find().toArray();
  //send res
  res.send({ message: "all users", payload: usersList });
});

//get user by id
userApp.get("/users/:name", async (req, res) => {
  
  //get name from url param
  let nameOfUser = req.params.name;
  //find the use by name
  let user = await usersCollectionObj.findOne({ name: nameOfUser });
  //send res
  res.send({ message: "user", payload: user });
});

//update user
userApp.put("/user", async (req, res) => {

  //get modified user from client
  let modifiedUser = req.body;
  //update a document in db
  let dbres = await usersCollectionObj.updateOne(
    { name: modifiedUser.name },
    { $set: { ...modifiedUser } }
  );
  //send res
  res.send({ message: "User modified" });
});

//delete user by name
userApp.delete("/user/:name", async (req, res) => {
  
  //get name from url
  let nameFromClient = req.params.name;
  //delete
  let dbres = await usersCollectionObj.deleteOne({ name: nameFromClient });
  //send
  res.send({ message: "User removed" });
});

//export userApp
module.exports = userApp;

//findOne() or find()
//db.collection.find()
