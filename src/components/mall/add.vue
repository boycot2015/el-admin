<template>
  <div class="root">
    <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="formData">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" class="name-inp"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="classfy">
        <el-select v-model="formData.selected"  placeholder="请选择分类">
          <el-option v-for="(item,index) in formData.classfyData" :key="index" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
     
      <el-form-item label="发布时间">
        <el-col :span="8">
          <el-form-item prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="formData.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow">
        <el-checkbox-group  v-model="formData.isShow">
          <el-checkbox name="isShow"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="颜色" prop="color">
        <el-select v-model="formData.selectedColor"  placeholder="请选择颜色">
          <el-option v-for="(item,index) in formData.color" :key="index" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配置" prop="config">
        <el-select v-model="formData.selectedConfig"  placeholder="请选择配置">
          <el-option v-for="(item,index) in formData.config" :key="index" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="网络" prop="network">
        <el-input v-model="formData.network" size="small" class="name-inp"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="formData.price" size="small" class="name-inp"></el-input>
      </el-form-item>
      <el-form-item label="原价格" prop="oldPrice">
        <el-input v-model="formData.oldPrice" size="small" class="name-inp"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model="formData.desc"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
        ref="upload"
        style="width: 30%;margin-right:20px;"
        class="upload"
        :action="uploadPath"
        :on-preview="handlePreview"
        :on-success="handleCallback"
        :on-remove="handleRemove"
        :file-list="upfiles"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">完成</el-button>
        <el-button @click="cancelEdit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      uploadPath:'',
      upfiles: [],
      formData: {
      name: '',
      filePath:'',
      classfyData:[],
      color:[],
      selected: '',
      selectedColor:'',
      selectedConfig:'',
      date: '',
      isShow: false,
      desc: '',
      network:'',
      config:[]
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        selected: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        desc: [
          { message: '请填写描述信息', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.formData.classfyData = [{id:1,name:'手机'},{id:2,name:'配件'}];
    this.formData.color = [{id:1,name:'黑色'},{id:2,name:'红色'},{id:3,name:'金色'},{id:4,name:'蓝色'},{id:5,name:'灰色'}];
    this.formData.config = [{id:1,name:'2G+16G'},{id:2,name:'2G+16G'},{id:3,name:'2G+32G'},{id:4,name:'3G+32G'},{id:5,name:'4G+64G'}];
    this.uploadPath = `${this.$hostname}/addphonedata`
  },
  methods: {
    submitForm (formName) {
      let pathName = `${this.$hostname}/addphonedata`;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(pathName,qs.stringify(this.formData),{
            headers: {
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
              }
          })
          .then(res=> {
            if(res.data.code==200){
              this.$router.go(-1);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          // this.$refs.upload.submit();
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelEdit () {
      this.$router.go(-1);
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleCallback(res,file){
      this.formData.filePath = res.filePath;
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
  width: 50%;
}
.el-input{
  width: 50%;
}
.el-textarea{
  width: 50%;
}
</style>
