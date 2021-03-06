const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const paymentRoute = require('./routes/payment');
const calendarRoute = require('./routes/calendar')
const subsRoute = require('./routes/subs')

const { populate } = require('./model/User');

dotenv.config();

//Connect to db
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true }, () => console.log('connected to db!'))

//Middleware
app.use(express.json())
app.use(cors());

//Route MiddleWare
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/calendar', calendarRoute);
app.use('/api/subs', subsRoute);

app.listen(3000, () => console.log('server running!'))