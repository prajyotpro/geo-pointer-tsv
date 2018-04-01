var cluster     = require('cluster'); // Only required if you want the worker id
var sticky      = require('sticky-session');
var config      = require('../config/app');


var http        = require('http');
var app         = module.exports = require('express')();


var express 	= require('express');


var server      = require('http').createServer(app);
var io          = require('socket.io')(server);


var port        = process.env.PORT || config.SERVER.PORT;


var bodyParser  = require('body-parser');
var helmet      = require('helmet');
var path        = require('path');
var multer      = require('multer');
var multipart   = require('connect-multiparty');
var path        = require('path');

const tsv       = require("node-tsv-json");

app.set('CONFIG', config);

var searchRouter               = require('../routes/search');


if (!sticky.listen(server, port)) {

    // Master code
    tsv({
        input: "app/assets/data.tsv", 
        output: "app/assets/data.json"
        ,parseRows: true
    }, function(err, result) {
        if(err) {
            console.error(err);
        }else {
            console.log("Data JSON file generated successfully ...");
            server.once('listening', function () { 
                console.log("Listening to port " + port + "..");
            });
        }
    });

} else {

    console.log("Worker %d is up and running..", cluster.worker.id);

    // Express server setup
    app.use(helmet());
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(multipart({
        uploadDir: config.tmp
    }));
    app.use('/', express.static('/home/prajyot/mywork/geo-pointer-tsv/web/'));


    // == WEB ==
    // app.get('/', function(req, res) {
    //     res.sendFile('/home/prajyot/mywork/geo-pointer-tsv/web/index.html');
    // });

    
    


    // ========================================== ROUTES ==========================================
    // API V1.0 Routes
    app.use(config.SERVER.API_PATH + 'v1/search', searchRouter);
    
    

    // ========================================== SOCKET ==========================================
    var chat = io
        .of('/chat')
        .on('connection', function (socket) {
            console.log('Socket connected.');
            chat.emit('connected', { success: true });
        });

    // const used = process.memoryUsage();
    // for (let key in used) {
    //     console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
    // };
}
