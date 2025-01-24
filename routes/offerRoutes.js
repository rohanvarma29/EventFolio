const express = require('express');
const router = express.Router();
const controller = require('../controllers/offerController');

router.post('/:id', controller.create);

module.exports = router;









