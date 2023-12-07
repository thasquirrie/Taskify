const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.enable('trust proxy');

const cookieParser = require('cookie-parser');

// Routes imports
const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const postRouter = require('./routes/postRoutes');

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  morgan('dev');
} else if (process.env.NODE_ENV === 'production') {
  morgan('short');
}

// app.use('uploads', express.static(path.join(__dirname, 'uploads')));
console.log('Yeah');

// app.get('/', (req, res) => {
//   res.json({
//     success: true,
//     data: '',
//   });
// });

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/posts', postRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(
      `The requested page: ${req.originalUrl} not found on this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
