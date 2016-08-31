var express = require('express');
var app = express();
var session = require('express-session')
var cors = require('cors')
var reqOrigin = require('./constants/constants').reqOrigin
var weatherData = require('./constants/widgets-data').weatherData
var customData = require('./constants/widgets-data').customData
var dashboardDataFile = require('./constants/constants').dashboardDataFile
var userDataFile = require('./constants/constants').userDataFile
var bodyParser = require('body-parser')
var passwordHash = require('password-hash');
var _ = require('lodash');

var jsonFile = require('jsonfile')
var path = require('path');

//middlewares start
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", reqOrigin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));


var getDashboardData = function () {
    var tempPath = path.join(__dirname, dashboardDataFile);
    return jsonFile.readFileSync(dashboardDataFile)
}
var writeDashboardData = function (data) {
    var tempPath = path.join(__dirname, dashboardDataFile);
    jsonFile.writeFileSync(dashboardDataFile, data)
}
var getUserData = function () {
    var tempPath = path.join(__dirname, userDataFile);
    return jsonFile.readFileSync(userDataFile)
}





// Authentication and Authorization Middleware
var auth = function (req, res, next) {
    if (req.session && req.session.userId === "2f65c37c-53d5-11e6-8d78-b8ca3a7402e5")
        return next();
    else
        return res.sendStatus(401);
};
//middlewares end

//login endpoint start
app.post('/auth/login', function (req, res) {
    try {
        if (!req.body.username || !req.body.password) {
            res.status(401).send({ authenticated: false });
            res.end()
        }
        else {
            var usersInfo = getUserData();
            usersInfo.forEach(function (userInfo) {
                if (req.body.username == userInfo.username && passwordHash.verify(req.body.password, userInfo.password)) {
                    req.session.userId = userInfo.userId;
                    res.status(200).send({ authenticated: true })
                    res.end()
                }
                else {
                    res.status(401).send({ authenticated: false });
                    res.end()
                }
            })
        }
    }
    catch (error) {
        res.sendStatus(500)
    }
});
//login endpoint end


//isauthenticated endpoint start
app.post('/auth/isauthenticated', auth, function (req, res) {
    try {
        res.status(200).send({ authenticated: true })
    }
    catch (error) {
        res.sendStatus(500)
    }
});
//isauthenticated endpoint end


app.post('/auth/logout', function (req, res) {
    try {
        req.session.destroy();
        res.send("logout success!");
    }
    catch (error) {
        res.sendStatus(500)
    }
});


//dashboardlist endpoint start
app.get('/dashboardslist', auth, function (req, res) {
    try {
        var dashboardData = getDashboardData();
        var finalData = [];
        dashboardData.forEach(function (dashboard) {
            if (req.session.userId == dashboard.userId) {
                finalData.push({
                    dashboardId: dashboard.dashboardId,
                    dashboardName: dashboard.dashboardName
                })
            }
        })
        res.status(200).send({ data: finalData })
    }
    catch (error) {
        res.sendStatus(500);
    }
});
//dashboardlist endpoint end



//widgets conf endpoint start
app.get('/widgetsconf', auth, function (req, res) {
    try {
        var dashboardData = getDashboardData();
        var finalData = [];
        dashboardData.forEach(function (dashboard) {
            if (req.session.userId == dashboard.userId && req.query.dashboardId == dashboard.dashboardId) {
                finalData.push({
                    dashboardId: dashboard.dashboardId,
                    widgetsConf: JSON.parse(dashboard.widgetsConf)
                })
            }
        })
        res.status(200).send({ data: finalData })
    }
    catch (err) {
        res.sendStatus(500);
    }
});
//widgets conf endpoint end



//remove dashboard endpoint start
app.post('/removedashboard', auth, function (req, res) {
    try {
        var dashboardData = getDashboardData();
        var finalData = [];
        finalData = _.filter(dashboardData, function (dashboard) {
            return (dashboard.dashboardId !== req.body.dashboardId && req.session.userId == dashboard.userId)
        });
        writeDashboardData(finalData)
        res.status(200).send({ status: true })
    }
    catch (err) {
        res.sendStatus(500);
    }
});
//remove dashboard  endpoint end




//getwidgetdata endpoint started

app.get('/getwidgetsdata', auth, function (req, res) {
    try {
        if (req.query.dataSourceType == 'weatherForecast') {
            res.status(200).send({ data: weatherData });
            res.end();
        }
        else {
            res.status(200).send({ data: customData })
            res.end();
        }
    }
    catch (err) {
        res.sendStatus(500);
    }
});

//getwidgetdata endpoint end








//save dashboard endpoint start

app.post('/savedashboard', auth, function (req, res) {
    try {
        var dashboardData = getDashboardData();
        var finalData = {};
        var count = 0

        var dashboard = _.find(dashboardData, function (dashboard, index) {
            count = index
            return req.session.userId == dashboard.userId && req.body.dashboardId == dashboard.dashboardId
        })
        if (dashboard) {
            dashboard.widgetsConf = req.body.widgetsConf
            dashboardData[count] = dashboard
        }
        else {
            dashboard = {
                dashboardId: req.body.dashboardId,
                userId: req.session.userId,
                dashboardName: req.body.dashboardName,
                widgetsConf: req.body.widgetsConf
            }
            dashboardData.push(dashboard)
        }
        writeDashboardData(dashboardData)
        res.status(200).send({ status: true })
    }
    catch (err) {
        res.sendStatus(500)
    }
});

//save dashboard endpoint end



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
