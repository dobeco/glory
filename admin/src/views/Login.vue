<template>
  <div class="login-container">
    <el-form class="login-form" :model="model" :rules="rules" ref="loginForm">
      <h3 class="title">系统登录</h3>
      <p class="tip">默认账号: admin 密码: admin</p>
      <el-form-item prop="username">
        <el-input v-model="model.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="model.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login" @click="handleLogin('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {

  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: { required: true, message: '用户名不能为空', trigger: 'blur' },
        password: { required: true, message: '密码不能为空', trigger: 'blur' },

      }
    }
  },
  methods: {
    handleLogin(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.post('login', this.model)
          const {token} = res.data;
          localStorage.token = token
          this.$router.push('/')
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          /* this.$http.post("login", this.model).then(res => {
            // 登录成功
            localStorage.token = res.data.token
            this.$router.push('/')
            this.$message({
              type: 'success',
              message: '登录成功'
            })

            // 页面跳转
            this.$router.push("/");
          }); */
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" >
.login-container {
  min-height: 100vh;
  background-image: url('../assets/images/login_bg.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .tip{
      color: red;
    }
    .login {
      width: 100%;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
}
</style>
