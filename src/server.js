const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config('./.env');

const app = require('./app.js');

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`App connected on port: ${port}`.cyan);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Server shutting down 💣💣💣');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM CALL! Shutdown gracefully ✌✌✌');
  server.close(() => {
    console.log('Process terminated 👍👍👍');
  });
});
