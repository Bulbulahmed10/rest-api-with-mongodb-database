const { v4: uuidv4 } = require("uuid");

const User = require("../models/user.model");

//! users -- get request
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//! find one user -- get request
const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({
      id: req.params.id,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//! create user --- post request
const createUser = async (req, res) => {
  try {
    const newUser = new User({
      id: uuidv4(),
      name: req.body.name,
      age: Number(req.body.age),
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//!update user -- update request
const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    user.name = req.body.name;
    user.age = Number(req.body.age);

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//! delete user -- delete request
const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne({
      id: req.params.id,
    });
    res.status(200).json({ message: "user is deleted" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { getUsers, getOneUser, createUser, updateUser, deleteUser };
