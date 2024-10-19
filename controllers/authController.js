const authService = require('../services/authService');
    const catchAsync = require('../utils/catchAsync');

    const register = catchAsync(async (req, res) => {
        const { username, password } = req.body;
        const token = await authService.register(username, password);
        res.status(201).json({ status: 'success', token });
    });

    const login = catchAsync(async (req, res) => {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.status(200).json({ status: 'success', token });
    });

    module.exports = { register, login };