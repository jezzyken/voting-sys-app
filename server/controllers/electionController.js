const SERVICE = require('../services/electionService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAll = catchAsync(async (req, res, next) => {
    const items = await SERVICE.getAll();
    res.status(200).json({
        status: 'success',
        results: items.length,
        data: {
            items
        }
    });
});

const getById = catchAsync(async (req, res, next) => {
    const item = await SERVICE.getById(req.params.id);
    if (!item) {
        return next(new AppError('Election not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            item
        }
    });
});


const getOngoingElectionCandidates = catchAsync(async (req, res, next) => {
    const items = await SERVICE.getOngoingElectionCandidates();
    res.status(200).json({
        status: 'success',
        results: items.length,
        data: {
            items
        }
    });
});


const getUpcomingEvents = catchAsync(async (req, res, next) => {
    const items = await SERVICE.getUpcomingEvents();
    res.status(200).json({
        status: 'success',
        results: items.length,
        data: {
            items
        }
    });
});


const add = catchAsync(async (req, res, next) => {
    const newItem = await SERVICE.add(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            item: newItem
        }
    });
});

const update = catchAsync(async (req, res, next) => {
    const updatedItem = await SERVICE.update(req.params.id, req.body);
    if (!updatedItem) {
        return next(new AppError('Election not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            item: updatedItem
        }
    });
});

const remove = catchAsync(async (req, res, next) => {
    const deletedItem = await SERVICE.remove(req.params.id);
    if (!deletedItem) {
        return next(new AppError('Election not found', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
});

module.exports = {
    getAll,
    getById,
    getOngoingElectionCandidates,
    getUpcomingEvents,
    add,
    update,
    remove,
};