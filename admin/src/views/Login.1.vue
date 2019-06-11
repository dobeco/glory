<template>
  <!-- <el-form  class="login-container" :rules="rules" ref="loginUser" :model="loginUser" >
        <h3 class="title">系统登录</h3>
        <el-form-item porp=username>
          <el-input v-model="loginUser.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop=password>
          <el-input type="password" v-model="loginUser.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  :loading="loading" style="width:100%;" @click="submitForm('loginUser')">登录</el-button>
        </el-form-item>
  </el-form>-->

  <el-form
    :model="loginUser"
    :rules="rules"
    ref="loginUser"
    class="login-container"
    @submit.native.prevent="submitForm"
  >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="name">
      <el-input v-model="loginUser.name" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginUser.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login" @click="submitForm('loginUser')">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      loginUser: {
        username: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],

      }
    }
  },
  methods: {
    async submitForm(formName) {
       const res = await this.$http.post('login', this.model)
      // sessionStorage.token = res.data.token
      localStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
     /*  this.$refs[formName].validate(  (valid) => {
        if (valid) {
          this.$http.post('login', this.loginUser).then(res=> {
            console.log(res.data)
          })
      
        } else {
          console.log('error submit!!');
          return false;
        }
      }); */

    
    },


  }
}
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login {
    width: 100%;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
