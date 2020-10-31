const express = require('express');
const { json } = require('body-parser');
const cookieSession = require('cookie-session');
require('express-async-errors');
require('./services/cache');

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

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

require('./database');

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!!!!`);
});
