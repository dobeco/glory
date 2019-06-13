<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" :model="model" :rules="rules" ref="ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接 (URL)" prop="url">
              <el-input v-model="item.url" type='url'></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 0.5rem;" prop="image">
              <!-- 在main.js里封装上传的图片地址和用户请求头 uploadUrl :action="$http.defaults.baseURL + '/upload'" -->
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
    let urlRules =(rule, value,callback) => {
      let regexp = new RegExp('(((http|ftp|https)://)?)([a-zA-Z0-9.-])(:[0-9]{1,4})/[a-zA-Z0-9&%./-~-]*')
      if (regExp.test(value) === false) {
        callback(new Error('不通过正则'));
      } else {
        callback();
      }
    }
    return {
      model: {
        items: []
      },
      rules: {
        name: [
          { required: true, message: '请输入广告', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传广告图片', trigger: 'blur' }
        ],
    

      }
    };
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res;
          if (this.id) {
            res = await this.$http.put(`rest/ads/${this.id}`, this.model);
          } else {
            res = await this.$http.post("rest/ads", this.model);
          }
          this.$router.push("/ads/list");
          this.$message({
            type: "success",
            message: "保存成功"
          });

        } else {
          console.log('error submit!!');
          return false;
        }

      })

    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
