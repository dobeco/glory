<template>
  <div class="login-container">
    <el-form class="login-form" :model="model" :rules="rules" ref="loginForm">
      <h3 class="title">王者荣耀后台管理系统</h3>
      <p class="tip">体验账号: admin 密码: admin</p>
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
import jwt_decode from 'jwt-decode'
export default {

  data() {
    return {
      model: {
        username: 'dobeco',
        password: '123456'
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

          // 存储token
          const { token } = res.data;
          localStorage.setItem('gloryToken', token)

          // 解析token
          const decode = jwt_decode(token);

          // 存储数据
          this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
          this.$store.dispatch("setUser", decode);

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
    // 判断是否为空函数
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background-image: url("../assets/images/login_bg.jpg");
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
    .tip {
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
