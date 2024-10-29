const SERVICE = require("../services/studentService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const getAll = catchAsync(async (req, res, next) => {
  console.log("get");

  const items = await SERVICE.getAll();
  res.status(200).json({
    status: "success",
    results: items.length,
    data: {
      items,
    },
  });
});

const getById = catchAsync(async (req, res, next) => {
  const item = await SERVICE.getById(req.params.id);
  if (!item) {
    return next(new AppError("Student not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      item,
    },
  });
});

const add = catchAsync(async (req, res, next) => {
  const newItem = await SERVICE.add(req.body);
  res.status(201).json({
    status: "success",
    data: {
      item: newItem,
    },
  });
});

const update = catchAsync(async (req, res, next) => {
  const updatedItem = await SERVICE.update(req.params.id, req.body);
  if (!updatedItem) {
    return next(new AppError("Student not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      item: updatedItem,
    },
  });
});

const remove = catchAsync(async (req, res, next) => {
  const deletedItem = await SERVICE.remove(req.params.id);
  if (!deletedItem) {
    return next(new AppError("Student not found", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const search = catchAsync(async (req, res, next) => {
  try {
    const students = await SERVICE.search(req);
    res.json({ success: true, data: { items: students } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const initiateLogin = catchAsync(async (req, res, next) => {
  const { studentId, password } = req.body;

  console.log(req.body)

  const result = await SERVICE.initiateLogin(studentId, password);

  if (result.status === "error") {
    return next(new AppError(result.message, 400));
  }

  res.status(200).json(result);
});

const verifyOTP = catchAsync(async (req, res, next) => {
  const { studentId, otp } = req.body;

  const result = await SERVICE.verifyOTP(studentId, otp);

  if (result.status === "error") {
    return next(new AppError(result.message, 400));
  }

  res.status(200).json(result);
});

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  search,
  initiateLogin,
  verifyOTP,
};
