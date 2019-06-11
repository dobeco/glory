
    const mongoose = require('mongoose');
    const db = mongoose.connection;
    require('../models/Category')
    mongoose.connect('mongodb://localhost/glory', { useNewUrlParser: true });

    db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));
    db.once('open', function () {
        console.log('数据库连接成功')
    });



