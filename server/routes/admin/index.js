/* var express = require('express');
var router = express.Router();
const Category = require('../../models/Category');

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




module.exports = router; */
module.exports = app => {
  var express = require('express');
  var router = express.Router({ mergeParams: true });
  const Category = require('../../models/Category');

  // 新建分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  // 更新分类数据
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除分类数据
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });


  });


  // 获取分类列表
  router.get('/', async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  });

  // 查询分类
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  app.use('/admin/api/rest/:resource',  (req, res, next)=>{
    const modelName = require('inflection').classify(req.params.resource);
    req.Model = require(`../../models/${modelName}`)
    next();
  },router)

  const multer = require('multer');
  const upload = multer({dest: __dirname+ '/../../public/uploads'})
  app.post('/admin/api/upload', upload.single('file'), function(req, res) {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    
    const { username, password } = req.body
    // 1.根据用户名找用户
    const AdminUser = require('../../models/AdminUser')
    const user = await AdminUser.findOne({ username }).select('+password')
    if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    // 3.返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token }) 
  })

  

}


