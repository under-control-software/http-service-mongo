const express = require('express');
const mongoClient = require('mongodb').MongoClient;

const mongoRoutes = require('./routes/mongo-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/mongo', mongoRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5003, () => {
        console.log('Listening on port 5003');
    }
);
