const express = require('express');
const {check} = require('express-validator');

const mongoControllers = require('../controllers/mongo-controllers');

const router = express.Router();

router.post(
    '/',
    [
        check('body')
            .not()
            .isEmpty()
    ],
    mongoControllers.handleQuery
)


router.get(
    '/',
    [],
    mongoControllers.handleQuery
)

module.exports = router;