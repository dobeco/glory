var express = require('express');
var router = express.Router();
const Category = require('../../models/Category');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 新建分类
router.post('/categories', async  (req,res) => {
  const model =  await Category.create(req.body);
  res.send(model);
});

// 更新分类数据
router.put('/categories/:id', async  (req,res) => {
  const model =  await Category.findByIdAndUpdate(req.params.id, req.body);
  res.send(model);
});

// 删除分类数据
router.delete('/categories/:id', async  (req,res) => {
  await Category.findByIdAndDelete(req.params.id, req.body);
  res.send({
    success: true
  });
});


// 获取分类列表
router.get('/categories', async (req, res) => {
  const items = await Category.find().populate('parent').limit(10);
  res.send(items);
});

// 查询分类
router.get('/categories/:id', async (req, res) => {
  const model = await Category.findById(req.params.id);
  res.send(model);
});




module.exports = router;
