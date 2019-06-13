<template>
  <div class="category-edit">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" :model="model" :rules="rules" ref="ruleForm">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'CategoryEdit',
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: [],
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],


      }
    }
  },
  created() {
    this.id && this.fetch()
    this.fetchParents()
  },
  methods: {
    // 保存
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res;
          if (this.id) {
            res = await this.$http.put(`rest/categories/${this.id}`, this.model)
          } else {
            res = await this.$http.post('rest/categories', this.model)
          }
          this.$router.push('/categories/list')
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
    // 获取数据
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },

    // 获取分类标签
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    }
  }
}
</script>
