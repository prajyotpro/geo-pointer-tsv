var Search        	= require('../controllers/search');
var express 		= require('express');
var router 			= express.Router();

// router.get('/', User.getUsers);
router.get('/points', Search.getAllAvailablePoints);
router.get('/', Search.findPoints);

module.exports = router;
