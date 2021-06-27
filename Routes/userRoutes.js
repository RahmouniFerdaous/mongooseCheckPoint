//call express
const express = require("express");
//call Router express methods
const route = express.Router();
//call User Schema
const User = require("../Models/userModel");
//Create and Save a Record of a Model:
route.post("/create-data/save", (req, res) => {
  const newPerson = req.body;
  const newUser = new User(newPerson); // Model new instance
  newUser
    .save()
    .then((doc) => res.send(doc))
    .catch((err) => res.status(401).json(err.message));
});
//Create Many Records with model.create()
route.post("/create-data/create", (req, res) => {
  const newPerson = req.body;
  User.create(newPerson)
    .then((doc) => res.send(doc))
    .catch((err) => res.status(401).json(err.message));
});
//Use model.find() to Search Your Database
route.get("/get-data/name", (req, res) => {
  const givenName = req.body.name;
  User.find({ name: givenName }) // find by name
    .then((doc) => res.send(doc))
    .catch((err) => res.status(401).json(err.message));
});
//Use model.findOne() to Return a Single Matching Document from Your Database
route.get("/get-data/favoriteFoods", (req, res) => {
  const givenFavoriteFood = "pizza"; // find by favoritesFood
  // Pick one user from the db and send it by req
  User.findOne({
    favoriteFoods: req.body.favoriteFoods.find(
      (elm) => elm === givenFavoriteFood
    ),
  })
    .then((doc) => res.send(doc))
    .catch((err) => res.status(401).json(err.message));
});
//Use model.findById() to Search Your Database By _id
route.get("/get-data/id", (req, res) => {
  const givenId = req.body._id;
  User.findById({ _id: givenId }) //find by name
    .then((doc) => res.send(doc))
    .catch((err) => res.status(401).json(err.message));
});
//Chain Search Query Helpers to Narrow Search Results
route.get("/get-data/favoriteFoods/burritos", (req, res) => {
  const givenFavoriteFood = "burritos"; 
  User.find({
    favoriteFoods: req.body.favoriteFoods.find( 
      (elm) => elm === givenFavoriteFood
    ),
  }) // Pick one user and send it by req
    .limit(2) // limit to 2 items
    .sort({ name: 1 }) // sort ascending by name
    .select("-age") // hide their age
    .exec() // execute the query
    .then((doc) => res.send(doc))
    .catch((err) => res.status(401).json(err.message));
});

//Perform Classic Updates by Running Find, Edit, then Save
route.put("/update-data/add", (req, res) => {
  const foodToAdd = "hamburger";
  const personId = req.body._id;
  User.findOne({ _id: personId }, (err, data) => {
    data.favoriteFoods.push(foodToAdd);
    data
      .save()
      .then((doc) => res.json(doc))
      .catch((err) => res.status(401).json({ error: err.message }));
  });
});
//Perform New Updates on a Document Using model.findOneAndUpdate()
route.put("/update-data/age", (req, res) => {
  const givenName = req.body.name;
  const givenAge = req.body.age;
  //find by name and update age and conserve the others infos
  User.findOneAndUpdate(
    { name: givenName },
    { $set: { age: givenAge } },
    { new: true }
  )
    .then((doc) => res.send(doc))
    .catch((err) => res.status(401).json(err.message));
});

//Delete One Document Using model.findByIdAndRemove
route.delete("/delete-data/id", (req, res) => {
  const personId = req.body._id;
  User.findOneAndDelete({ _Id: personId })
    .then(() => res.send("user deleted"))
    .catch((err) => res.status(401).json(err.message));
});

//Delete Many Documents with model.remove()
route.delete("/delete-data/name", (req, res) => {
  const personName = req.body.name;
  User.remove({ name: personName })
    .then(() => res.send("user deleted"))
    .catch((err) => res.status(401).json(err.message));
});
module.exports = route;
