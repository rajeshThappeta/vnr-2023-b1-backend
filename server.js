//create express app
const exp = require("express");
const app = exp();

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


//get all users
app.get("/users", (req, res) => {
  res.send({ users: usersList });
});

//get user by id
app.get("/users/:id", (req, res) => {
  //get url params
  let id = Number(req.params.id); //{ id : 12}

  let user = usersList.find((userObj) => userObj.id === id);
  res.send({ payload: user });
});



//update user by id
//delete user by id

//assign port number
app.listen(4000, () => console.log("server running on 4000..."));


let x='121'
//convert to number
let a=(+x)
let b=Number(x)

Number({id:12})