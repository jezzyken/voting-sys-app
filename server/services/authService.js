const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const register = async (username, password) => {
  const newUser = await User.create({ username, password });
  return { token: signToken(newUser._id) };
};

const login = async (username, password) => {
    const user = await User.findOne({ username });
    
    if (!user || !(await user.correctPassword(password))) {
      throw new Error("Incorrect username or password");
    }
  
    const token = signToken(user._id);
    
    const userObject = user.toObject();
    delete userObject.password;
  
    return { token, user: userObject };
  };

module.exports = { register, login };
