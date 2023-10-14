const express = require('express');

const router = express.Router();

const connectionController = require('../controllers/connectionController');

router.get('/', connectionController.index);

router.get('/new', connectionController.new);

router.post('/', connectionController.create);

router.get('/:id', connectionController.show);

router.get('/:id/edit', connectionController.edit);

router.put('/:id', connectionController.update);

router.delete('/:id', connectionController.delete);

module.exports = router;