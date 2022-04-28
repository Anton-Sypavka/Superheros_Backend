const cors = require('cors');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const mongoose = require('mongoose');
// const morgan = require('morgan');

const formidableMiddleware = require('express-formidable');

const { PORT, DATABASE, ALLOWED_ORIGIN } = require('./configs/config');
const { superherosRouter } = require('./routes');

mongoose.connect(DATABASE);
const app = express();

// app.use(formidableMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(cors());
app.options('*', cors());


// if (process.env.ENV === 'development') {
//     app.use(morgan('dev'));
// }

app.use('/superheros', superherosRouter);
app.get('/ping', (req, res) => res.send('pong'));
app.use(_globalErrorHandler);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listen on ${PORT}`);
});

// eslint-disable-next-line no-unused-vars
function _globalErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Something went wrong'
        });
}

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!origin) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
}
