<template>
  <div class="root">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="12">
        <el-dropdown trigger="click" @command="handleCommand" >
          <el-button size="medium" type="primary">
            {{title}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu
           style="left:250px;top:175px;" slot="dropdown">
            <el-dropdown-item
            v-for="item in category" :key="item.name"
            :command="item.name"
            label="商品ID">
             {{item.name}}
             </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <router-link to="/mall/add">
          <el-button size="medium" type="primary">
              新增
          </el-button>
        </router-link>
      </el-col>
    </el-row>
    <el-table
      stripe
      height="500"
      :data="goodsData"
      style="width: 100%;overflow-x:scroll;">
      <el-table-column
      type="selection"
      :default-sort = "{prop: 'date', order: 'descending'}"
      width="55">
    </el-table-column>
      <el-table-column
        prop="id"
        label="序号ID"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="desc"
        show-overflow-tooltip
        label="描述">
      </el-table-column>
      <el-table-column
        prop="isShow"
        label="是否显示"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="handleShow(scope.$index, scope.row)">{{scope.row.isShow==='false'?'显示':'隐藏'}}</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" ></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      title: '全部',
      category: [{'name': '全部'},{'name': '手机'}, {'name': '配件'}],
      goodsData: []
    }
  },
  created () {
    this.getgoodsData()
  },
  methods: {
    getPhoneData () {
      let that = this
      this.$http.get(`${this.$hostname}/getgoodsdata`).then(function (res) {
        // console.log(res.data.goodsData)
        let phoneData = res.data.goodsData
        that.goodsData = phoneData
      }).catch(function (res) {
        console.log(res)
      })
    },
    getSuitData () {
      let that = this
      this.$http.get(`${this.$hostname}/getgoodsdata`).then(function (res) {
        // console.log(res.data.suitData)
        let getSuitData = res.data.suitData
        that.goodsData = getSuitData
      }).catch(function (res) {
        console.log(res)
      })
    },
    getgoodsData () {
      let that = this
      this.$http.get(`${this.$hostname}/getgoodsdata`).then(function (res) {
        // console.log(res.data)
        let goodsData = res.data.goodsData.concat(res.data.suitData)
        goodsData.forEach((e,i)=>{
          e.id = i+1;
        })
        that.goodsData = goodsData
      }).catch(function (res) {
        console.log(res)
      })
    },
    handleEdit (index, row) {
      // console.log(index, row)
      this.$router.push(`/mall/edit?id=${row.Id}&typeId=${row.typeId}`)
    },
    handleDelete (index, row) {
      // console.log(index, row)
      this.$http.get(`${this.$hostname}/deletebanner?id=${row.Id}`).then(res => {
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    handleShow (index, row) {
      // console.log(index, row)
      if (row.isShow === 'false') {
        row.isShow = 'true'
      } else {
        row.isShow = 'false'
      }
      if (row.typeId === '1') {
        this.$http.get(`${this.$hostname}/updatenews?id=${row.Id}&isShow=${row.isShow}`).then(res => {
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$http.get(`${this.$hostname}/bannerStatus?id=${row.Id}&isShow=${row.isShow}`).then(res => {
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleCommand (command) {
      this.title = command
      if (command === '手机') {
        this.getPhoneData()
      } else if (command === '配件') {
        this.getSuitData()
      }else{
        this.getgoodsData()
      }
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
.el-breadcrumb {
  line-height: 30px;
  border-bottom: 1px solid #ccc;
}
.el-dropdown{
  line-height: 40px;
}
.el-dropdown-menu{
  width: 89px;
}
.el-dropdown-menu li{
  display: block;
}
</style>
