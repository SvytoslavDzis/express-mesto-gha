const express = require('express');
const auth = require('./middlewares/auth');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const router = require('./routes');
const { InternalServerError } = require('./errors/InternalServerError')
const { login, createUser } = require('./controllers/users')
const { validateSigUp, validateSigIn } = require('./validation/validation')

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.post('/signin', validateSigIn, login);
app.post('/signup', validateSigUp, createUser);
app.use(auth);// все роуты ниже этой строки будут защищены авторизацией
app.use(router);
app.use(InternalServerError)
app.use(errors())

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);