const express = require('express');
const { default: mongoose } = require('mongoose');

const activityRouter = require('./src/routers/activities');
const userRouter = require('./src/routers/user')
// const scheduleRouter = require('./src/routers/schedule');
const config = require('./config')

const PORT = 8080;

const app = express();

console.log('config')
console.log(config)

// Middlewares
app.use(express.json());

app.use('/activities', activityRouter);
app.use(userRouter);
// app.use('/schedule', scheduleRouter);

const start = async () => {
  // DO NOT COMMIT/PUSH USERNAME AND PASSWORD TO Github
  await mongoose.connect(config.mongodb, {dbName: 'viv_project'});
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

start();
