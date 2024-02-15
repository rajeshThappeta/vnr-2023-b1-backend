//create mini-express app
const exp = require("express");
const userApp = exp.Router();

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

  //user from client
  const newUser = req.body;
  //save to db
  const dbres = await usersCollectionObj.insertOne(newUser);
  if (dbres.acknowledged === true) {
    //send res
    res.send({ message: "User created" });
  }
});

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
