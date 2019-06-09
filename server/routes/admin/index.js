
module.exports = app => {
  var express = require('express');
  var router = express.Router({ mergeParams: true });
  // const Category = require('../../models/Category');
  const jwt = require('jsonwebtoken');
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert');

  // 新建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  // 更新资源数据
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除数据
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });


  });


  // 获取资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit()
    res.send(items)
  });

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  // 查询 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware() ,router)

  const multer = require('multer');
  const upload = multer({dest: __dirname+ '/../../public/uploads'});
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;

    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password');
    assert(user, 422, '用户不存在')
    /* if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    } */
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password);
    assert(isValid, 422, '密码错误');
   
    /* if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    } */
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token }) 
  })

}
