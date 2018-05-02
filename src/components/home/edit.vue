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
      <el-form-item label="发布时间" required>
        <el-col :span="8">
          <el-form-item prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="formData.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow">
          <el-checkbox v-model="checked" name="isShow"></el-checkbox>
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
      checked:false,
      uploadPath:'',
      upfiles: [],
      formData: {
      name: '',
      classfyData:[],
      selected: '',
      date: '',
      delivery: false,
      isShow: false,
      resource: '',
      desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        selected: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        desc: [
          { message: '请填写描述信息', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.formData.classfyData = [{id:1,name:'轮播图'},{id:2,name:'新闻'}]  
    if(this.$route.query.id){
      this.getData();
    }
  },
  methods: {
    getData(){
      let pathName = '',uploadPath =  '';
      if(this.$route.query.typeId==='0'){
        pathName = '/getbanner';
        uploadPath = '/updatebanner'
      }else{
        pathName = '/getnews';
        uploadPath = '/updatenews'
      }
      this.uploadPath = `${this.$hostname}${uploadPath}?id=${this.$route.query.id}`;
      let path = `${this.$hostname}${pathName}?id=${this.$route.query.id}`;
      this.$http.get(path).then(res=>{
          let renderData = {};
          if(res.data.bannerData){
            renderData = res.data.bannerData;
          }else{
            renderData = res.data.newsData;
          }
        if(renderData.typeId==='0'){
          this.formData.name = renderData.name;
          this.formData.desc = renderData.imgUrl;          
          this.formData.selected = '轮播图';
        }else{
          this.formData.name = renderData.title;
          this.formData.selected = '新闻';
          this.formData.desc = renderData.desc;          
        }
        this.checked = renderData.isShow==='true'?true:false;        
        this.upfiles.push({name:renderData.name,url:`${this.$hostname}${renderData.imgUrl}`});
        this.formData.isShow = renderData.isShow;
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pathName = ``;
          if(this.$route.query.typeId==='0'){
            pathName = `${this.$hostname}/updatebanner?id=${this.$route.query.id}`
          }else if(this.$route.query.typeId==='1'){
            pathName = `${this.$hostname}/updatenews?id=${this.$route.query.id}`
          }
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
