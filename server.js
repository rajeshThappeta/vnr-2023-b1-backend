//create express app
const exp = require("express");
const app = exp();


//extract body of req
app.use(exp.json())

//sample data
let usersList = [
  {
    id: 1,
    name: "ravi",
  },
  {
    id: 2,
    name: "bhanu",
  },
];

//user api(routes)

//create user
app.post('/new-user',(req,res)=>{
  //get new user resource from req object
  let newUser=req.body;
  //add new user to usersList
  usersList.push(newUser)
  //send res
  res.send({message:"New user created"})
})




//get all users
app.get("/users", (req, res) => {
 // console.log(req.body)
  res.send({ message: "all users", payload: usersList });
});

//get user by id
app.get("/users/:id", (req, res) => {
 // console.log(req.body)
  //get url params
  let id = Number(req.params.id); //{ id : 2}

  let user = usersList.find((userObj) => userObj.id === id);
  if (user === undefined) {
    res.send({ message: "No user found" });
  }else{
    res.send({message:'single user',payload:user})
  }
});




//update user 
app.put('/user',(req,res)=>{
  //get modified user from req
  let modifieduser=req.body;
  //get index of user with id as modifiedUser.id
  let index=usersList.findIndex(userObj=>userObj.id===modifieduser.id)
  //if index is -1
  if(index===-1){
    res.send({message:"User not found with this ID"})
  }else{
    //replace user with modifiedUser
    usersList.splice(index,1,modifieduser);
    //send res
    res.send({message:"User modified"})
  }
})


//delete user by id
app.delete('/user/:id',(req,res)=>{

  //get ID from URL
  let id=Number(req.params.id);
  //get index of user with this ID
  let index=usersList.findIndex(userObj=>userObj.id===id)
  //if user nort found
  if(index===-1){
    res.send({message:"No user to delete"})
  }else{
    //delete user
    usersList.splice(index,1);
    res.send({message:"User deleted"})
  }

})



//assign port number
app.listen(4000, () => console.log("server running on 4000..."));
