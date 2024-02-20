const express = require("express");
const router = express.Router();
const { users, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const {validateToken} = require('../middlewares/AuthMiddleware')

const {sign} = require('jsonwebtoken');
const { QueryTypes } = require("sequelize");

router.post("/", async (req, res) => {
  const userObj = req.body.user;
  bcrypt.hash(userObj.password_hash, 10).then((hash) => {
    users.create({
      username: userObj.username,
      password_hash: hash,
    });
    res.json("SUCCESS");
  });
});


router.post("/Movieid",validateToken, async (req, res) => {
  try {
    const movieId = req.body.movie_id;
    const { user_id } = req.user; 
    const updatedRows = await users.update({ movie_id: movieId }, {
      where: {user_id: user_id} 
    });

    res.json(updatedRows);
  } catch (error) {
    console.error('Error updating user movie_id:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// You destruct the password,username and email the user puts in and then you hash the password and set the new 
// password equal the old one. This is collected from the user webpage

router.post("/Login", async (req, res) => {
  const userObj = req.body.user;


  const user = await users.findOne({ where: { username: userObj.username } });

 

  // You are checking to see where the username the user puts in is equal to the username in the database

  if (!user) {
    return res.json({ error: "User Doesn't Exist" });
  }

  bcrypt.compare(userObj.password, user.password_hash).then((match) => {
    if (!match) {
      return res.status(401).json({ error: "User Not Found" });
    }

    const accessToken = sign({ username: user.username, user_id: user.user_id, movie_id:user.movie_id }, "importantsecret");
    // if the username matches, and the password is correct, create a token

    res.json({ token: accessToken, username: userObj.username, id: user.user_id, movie_id: user.movie_id });
  });
});

router.get('/auth', validateToken, (req, res) => {
  res.json(req.user);
});

router.get('/id',validateToken, async (req,res) => {
  const id= req.user.user_id;
  //const movie_id= await sequelize.query("select movie_id from netflix.users where user_id = ?",{replacements:[id],type:QueryTypes.SELECT})
  const movie_id = await users.findOne({
    where: {
        user_id: id,
    },
    attributes: ['movie_id'], // Specify the attribute you want to retrieve
}); 
res.json(movie_id);
});

module.exports = router;
