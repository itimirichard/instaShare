const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/instashare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

console.log('Connected to mongodb');
