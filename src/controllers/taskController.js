const prisma = require('../../prisma/index');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const colors = require('colors');

exports.getUserTasks = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const tasks = await prisma.task.findMany({
    where: {
      userId: id,
    },
  });

  res.status(200).json({
    status: 'success',
    length: tasks.length,
    data: {
      tasks,
    },
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;

  console.log({ taskId });

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task)
    return next(new AppError(`No task with this id ${taskId} found.`, 404));

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const { title, description } = req.body;

  if (!title || !description)
    return next(
      new AppError('Please provide both title and description to continue', 400)
    );

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId: id,
    },
  });

  res.status(201).json({
    status: 'success',
    data: {
      task,
    },
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await prisma.task.update({
    where: { id: taskId },
    data: req.body,
  });

  console.log(task);

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  res.status(204).json({
    status: 'success',
  });
});
