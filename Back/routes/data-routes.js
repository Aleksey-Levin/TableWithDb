const Router = require('express');
const router = new Router();
const userController = require('../controller/data-controller');

router.get('/data', userController.getData);

module.exports = router;