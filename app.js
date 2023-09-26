
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const httpStatus = require('./config/httpStatus');


app.use(cors({
    credentials: true,
    origin: function (_origin, callback) {
        callback(null, true)
    }
}))

require('./config/dbConnection');
app.get('/', (_req, res) => {
    return res.status(httpStatus.SUCCESS.statusCode).send('WELCOME TO TODO BACKEND..')
})
app.use(express.json())
app.use('/', require('./routes'))
app.listen(port, (err) => {
    if (err) {
        console.log('something went wrong...')
    }
    console.log(`Listening on port ${port}`)
})



