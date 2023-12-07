const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const prisma = require('../../prisma/index');

const signToken = (id) => {
  expiresIn = process.env.JWT_EXPIRES_IN;
  console.log({ expiresIn, id });
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSignedToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const comparePasswords = async (userPassword, password) => {
  return await bcrypt.compare(userPassword, password);
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password)
    return next(
      new AppError('Please provide email and password to continue', 400)
    );

  const encryptedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: encryptedPassword,
    },
  });

  console.log({ user });

  user.password = undefined;

  createSignedToken(user, 200, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Provide both email and password', 400));

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  console.log({ user });

  if (!user || !(await comparePasswords(password, user.password)))
    return next(new AppError('Invalid login credentials', 401));

  user.password = undefined;

  createSignedToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1. Check if token exist
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new AppError(
        'You are not logged in. Please log in to get autorization.',
        401
      )
    );
  // 2. Check if token is valid
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user exist
  const currentUser = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!currentUser)
    return next(new AppError('The user with this token does not exist', 401));

  // 4. Check if user hasn't changed password after token issuance
  // if (await currentUser.passwordChangedAfter(decoded.iat))
  //   return next(
  //     new AppError(
  //       'Password has been changed after this token was issued. Please log in again!',
  //       401
  //     )
  //   );
  req.user = currentUser;
  next();
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
