const express = require('express');
require('express-async-errors');
const { json } = require('body-parser');
const cookieSession = require('cookie-session');
// Routes
const currentUserRouter = require('./routes/auth/current-user');
const signinRouter = require('./routes/auth/signin');
const signoutRouter = require('./routes/auth/signout');
const signupRouter = require('./routes/auth/signup');
const downloadRouter = require('./routes/files/download');
const showFilesRouter = require('./routes/files/show');
const uploadRouter = require('./routes/files/upload');

const errorHandler = require('./middlewares/error-handler');
const compressFiles = require('./jobs/compressFiles');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('./database');

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.get('/', (req, res) => {
  res.status(200).send(`Welcome to login , sign-up api`);
});

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(downloadRouter);
app.use(showFilesRouter);
app.use(uploadRouter);

app.all('*', async () => {
  throw new Error('Not found');
});

app.use(errorHandler);

compressFiles.start();

app.listen(5000, () => {
  console.log('Listening on port 5000!!!!');
});
