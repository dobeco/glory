<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" :model="model" :rules="rules" ref="ruleForm">
      <el-form-item label="所属分类" prop="categories">
        <el-select v-model="model.categories" multiple :multiple-limit="3">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情" prop="body">
        <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
        <!-- <el-input v-model="model.body"></el-input> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: 'ActicleEdit',
  props: {
    id: {},
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        title: '',
        body: ''
      },
      categories: [],

      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        body: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        categories: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res
          if (this.id) {
            res = await this.$http.put(`rest/articles/${this.id}`, this.model)
          } else {
            res = await this.$http.post('rest/articles', this.model)
          }
          this.$router.push('/articles/list')
          this.$message({
            type: 'success',
            message: '保存成功'
          })

        } else return false

      })

    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCatgories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },

  },
  created() {
    this.fetchCatgories()
    this.id && this.fetch()
  }
}
</script>
