<template>
  <div class="root">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table stripe height="500" :data="categoryData" style="width: 100%;overflow-x:scroll;">
      <el-table-column type="selection" :default-sort="{prop: 'date', order: 'descending'}" width="55">
      </el-table-column>
      <el-table-column prop="Id" label="序号ID" sortable width="120">
      </el-table-column>
      <el-table-column prop="name" label="标题" >
      </el-table-column>
      <el-table-column prop="isShow" label="是否显示" >
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleShow(scope.$index, scope.row)">{{scope.row.isShow==='false'?'显示':'隐藏'}}</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.query.id;
      let path1 = `${this.$hostname}/getbanner`;
      let path2 = `${this.$hostname}/getnews`;
      this.$http.get(path1).then(res1 => {
        let typeId = res1.data.bannerData[0].typeId;
        let bannerData = res1.data.bannerData;
        let isShow = "false";
        bannerData.forEach(el => {
          if (el.isShow === "true") {
            isShow = "true";
          }
        });
        this.categoryData.push({ Id: 1, name: "轮播图", isShow, typeId });
        this.$http.get(path2).then(res2 => {
          let typeId = res2.data.newsData[0].typeId;
          let newsData = res2.data.newsData;
          let isShow = "false";
          newsData.forEach(el => {
            if (el.isShow === "true") {
              isShow = "true";
            }
          });
          if (typeId === "1") {
            this.categoryData.push({ Id: 2, name: "新闻", isShow, typeId });
          }
        });
      });
    },
    handleEdit(index, row) {
      // console.log(index, row)
      this.$router.push("/edit");
    },
    handleDelete(index, row) {
      // console.log(index, row)
      this.$http
        .get(`${this.$hostname}/deletebanner?id=${row.Id}`)
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleShow(index, row) {
      // console.log(index, row)
      if (row.isShow === "false") {
        row.isShow = "true";
      } else {
        row.isShow = "false";
      }
      if (row.typeId === "1") {
        this.$http
          .get(`${this.$hostname}/updatenews?isShow=${row.isShow}`)
          .then(res => {})
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$http
          .get(`${this.$hostname}/bannerStatus?isShow=${row.isShow}`)
          .then(res => {})
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0;
  text-align: center;
}
a {
  color: #42b983;
}
.el-breadcrumb {
  line-height: 30px;
  border-bottom: 1px solid #ccc;
}
.el-dropdown {
  line-height: 40px;
}
.el-dropdown-menu {
  width: 89px;
}
.el-dropdown-menu li {
  display: block;
}
</style>
