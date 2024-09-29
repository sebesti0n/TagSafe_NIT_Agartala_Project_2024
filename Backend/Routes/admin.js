const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const validateMiddleware = require('../Middlewares/authenticationMiddleware');


router.post('/login',adminController.adminLogin);
router.post('/addAdmin',adminController.addAdmin);
router.get('/getCameras',validateMiddleware,adminController.getCameras);
router.get('/camOwner',validateMiddleware,adminController.getCameraOwner);
module.exports = router;