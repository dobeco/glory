<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" :model="model" :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <!-- 在main.js里封装上传的图片地址和用户请求头 uploadUrl :action="$http.defaults.baseURL + '/upload'" -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        username: '',
        password: '',
        avatar: ''
      },
       rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 5, message: '长度不能超过 8 个字符', trigger: 'blur' }
        ],
        password: { required: true, message: '请输入密码', trigger: 'blur' },
        avatar: { required: true, message: '请上传头像', trigger: 'blur' }
      }

    }
  },
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url;
    },
    async save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res
          if (this.id) {
            res = await this.$http.put(`rest/admin_users/${this.id}`, this.model)
          } else {
            res = await this.$http.post('rest/admin_users', this.model)
          }
          this.$router.push('/admin_users/list')
          this.$message({
            type: 'success',
            message: '保存成功'
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      })

    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    },


  },
  created() {
    this.id && this.fetch()
  }
}
</script>
