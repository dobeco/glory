const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('您好啊！欢迎访问expres网站');
});

module.exports = router;