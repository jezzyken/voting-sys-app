const User = require('../models/userModel');
    const jwt = require('jsonwebtoken');

    const signToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '90d' });
    };

    const register = async (username, password) => {
        const newUser = await User.create({ username, password });
        return { token: signToken(newUser._id) };
    };

    const login = async (username, password) => {
        const user = await User.findOne({ username });
        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new Error('Incorrect username or password');
        }
        return { token: signToken(user._id) };
    };

    module.exports = { register, login };