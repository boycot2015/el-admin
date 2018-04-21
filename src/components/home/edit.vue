<template>
  <div class="root">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" class="name-inp"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择分类">
          <el-option label="轮播图" value="轮播图"></el-option>
          <el-option label="新闻" value="新闻"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间" required>
        <el-col :span="8">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="是否显示" prop="type">
        <el-checkbox-group  v-model="ruleForm.type[0]">
          <el-checkbox name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
        style="width: 20%;margin-right:20px;"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      fileList2: [],
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        desc: [
          { message: '请填写描述信息', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    if(this.$route.query.id){
      this.getData();
    }
  },
  methods: {
    getData(){
        this.$http.get(`${this.$hostname}/getbanner?id=${this.$route.query.id}`).then(res=>{
          // console.log(res.data);
          let bannerData = res.data.bannerData;
          this.ruleForm.name = bannerData.name;
          if(bannerData.typeId==='0'){
            this.ruleForm.region = '轮播图';
          }
          this.ruleForm.desc = bannerData.imgUrl;
          this.ruleForm.type.push(bannerData.isShow);
          this.fileList2.push({name:bannerData.name,url:`${this.$hostname}${bannerData.imgUrl}`});
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 ;
  text-align: center;
}
a {
  color: #42b983;
}
.el-input.name-inp{
  width: 25%;
}
.el-input{
  width: 50%;
}
.el-textarea{
  width: 50%;
}
</style>
