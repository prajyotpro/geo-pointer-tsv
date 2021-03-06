const Config 		= require('../config/app');
const async 		= require('async');
const haversine 	= require('haversine');
const _ 	        = require('underscore');

const pointData		= require('../assets/data');

const Point = function() {

};

Point.prototype.getAllPoints = function(callback) {

    return callback(null, pointData);
};


Point.prototype.findInPointByRadius = function(data, callback) {

    if(data.latitude == undefined || data.latitude.trim() == '') {
        return callback("Please enter latitude", null);
    }

    if(data.longitude == undefined || data.longitude.trim() == '') {
        return callback("Please enter longitude", null);
    }

    var radius      = isNaN(data.radius) || data.radius.trim() == '' ? Config.DEFAULT_RADIUS : data.radius;
    delete data.radius;

    var foundPoints = [];

    async.each(pointData, function(val, callback) {

        if(val[1] != undefined) { 

            let coordinates = val[1].split(",");
            coordinates = {
                latitude:   coordinates[0],
                longitude:  coordinates[1]
            };

            let distance = haversine(data, coordinates);
            if( distance <= radius ) { 

                val = {
                    distance    : distance, 
                    type        : val[0],
                    coordinates : coordinates
                };
                foundPoints.push(val);
            }

            callback();
        }


    }, function(error) {

        if(error) {
            return callback(error, null);
        } else {

            var typeCount = _.countBy(foundPoints, function(num) {
                return num.type;
            });

            var totalPoints = _.countBy(pointData, function(num) {
                return num[0];
            });

            var stats = [];
            for(var key in totalPoints) {
                stats.push( {
                    key   : key,
                    actual: totalPoints[key],
                    found : typeCount[key] == undefined ? 0 : typeCount[key]
                } );
            }

            let result = {
                stats: stats, 
                found: foundPoints
            }

            return callback(null, result);
        }   
    });
};


module.exports = new Point();