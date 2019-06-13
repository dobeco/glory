<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" :model="model" :rules="rules" ref="ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <!-- 在main.js里封装上传的图片地址和用户请求头 uploadUrl :action="$http.defaults.baseURL + '/upload'" -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar">
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
        name: '',
        icon: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入物品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请上传物品图标', trigger: 'change' }
        ],

      }
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, 'icon', res.url)
      // this.model.icon = res.url
    },
     save(formName) {
      this.$refs[formName].validate( async(valid) => {
        if (valid) {
          let res;
          if (this.id) {
            res = await this.$http.put(`rest/items/${this.id}`, this.model);
          } else {
            res = await this.$http.post("rest/items", this.model);
          }
          this.$router.push("/items/list");
          this.$message({
            type: "success",
            message: "保存成功"
          })

        } else {
          console.log('error submit!!');
          return false;
        }

      })

    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>


