<template>
  <div class="hero-edit">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" :model="model" :rules="rules" ref="ruleForm">
      <el-tabs type="border-card">
        <!-- 基础信息 -->
        <el-tab-pane label="基础信息">
          <el-form-item label="名称" prop="name">
            <el-input v-model="model.name" type="text" max="10"></el-input>
          </el-form-item>
          <el-form-item label="称号" prop="title">
            <el-input v-model="model.title"></el-input>
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
          <el-form-item label="类型" prop="categories">
            <el-select v-model="model.categories" multiple :multiple-limit="3">
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple :multiple-limit="6">
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple :multiple-limit="6">
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧" prop="usageTips">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧" prop="battleTips">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路" prop="teamTips">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <!-- 技能 -->
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
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
      categories: [],
      items: [],
      model: {
        name: '',
        title: '',
        avatar: '',
        scores: {
          difficult: 1,
          skills: 1,
          attack: 1,
          attack: 1,
          survive: 1
        },
        skills: [],
        items1: [],
        items2: [],
        partners: [],
        battleTips: '',
        teamTips: '',
        usageTips: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入英雄名称', trigger: 'blur' },
          { max: 10, message: '长度不能超过 10 个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入英雄称号', trigger: 'blur' },
          { max: 10, message: '长度不能超过 10 个字符', trigger: 'blur' }
        ],
        avatar: { required: true, message: '请上传英雄头像', trigger: 'blur' },
        categories: { required: true, message: '至少选择一个类型', trigger: 'blur' },
        usageTips: { required: true, message: '请填写使用技巧', trigger: 'blur' },
        equip: { required: true, message: '请选择装备', trigger: 'blur' },
        battleTips: { required: true, message: '请填写对战技巧', trigger: 'blur' },
        teamTips: { required: true, message: '请填写团战思路', trigger: 'blur' },
      }
    };
  },
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url;
    },
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res;
          if (this.id) {
            res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
          } else {
            res = await this.$http.post("rest/heroes", this.model);
          }
          this.$router.push("/heroes/list");
          this.$message({
            type: "success",
            message: "保存成功"
          });
        } else {
          return false;
        }
      })

    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>

<style>
</style>
