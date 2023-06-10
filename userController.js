const userModel = require("../models/userModel");

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const getuserController = async (req, res) => {
  try {
    const users = await userModel.find({
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(erorr);
  }
};

const deleteuserController = async (req, res) => {
  try {
    await userModel.findOneAndDelete({ _id: req.body.userid });
    res.status(200).send("User Deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


module.exports = { loginController, registerController, getuserController, deleteuserController };
