const Controller 	= require('../core/controller');
const Config 		= require('../config/app');

const pointModel 	= require('../models/point');


var Search = function() {
	Controller.call(this);
};


Search.prototype = Object.create(Controller.prototype);
Search.prototype.constructor = Search;


Search.prototype.getAllAvailablePoints = function(req, res) {

	pointModel.getAllPoints(function(error, result) {
		return res.status(Config.CODES.SUCCESS).send(result);
	});
};


Search.prototype.findPoints = function(req, res) {

	pointModel.findInPointByRadius(req.query, function(error, result) {

		if(error) {
			return res.status(Config.CODES.BAD_REQUEST).send(error);
		}
		
		result = {
			count: result.length,
			data : result
		}
		return res.status(Config.CODES.SUCCESS).send(result);
	});
};


module.exports = new Search();
