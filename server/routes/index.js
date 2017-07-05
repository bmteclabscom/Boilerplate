var express = require('express')
var router = express.Router();

router.get('/', function (req, res) { // added wildcard for this because app is going to single page with react
    res.render('index', {
        title: 'Welcome'
    });
});

router.get('/dashboard', function (req, res) { // added wildcard for this because app is going to single page with react
    res.render('index', {
        title: 'Welcome'
    });
});

module.exports = router;