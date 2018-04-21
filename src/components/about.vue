<template>
 <div class="root">
  <ul v-for="(item,index) in listData" :key = "index">
   <li>
    <span>{{item.name}}</span>
    <div @click = "getItem(index, i)" :class = "el.isSelect?'active':'' " v-for = "(el,i) in item.itemData" :key = "i">
     {{el.name}}
    </div>
   </li>
  </ul>
 </div>
</template>
<script>

export default {
  data () {
    return {
      listData: [
        {name: '1', itemData: [{name: '11', isSelect: false}, {name: '12', isSelect: false}, {name: '13', isSelect: false}]},
        {name: '2', itemData: [{name: '21', isSelect: false}, {name: '22', isSelect: false}, {name: '23', isSelect: false}]},
        {name: '3', itemData: [{name: '31', isSelect: false}, {name: '32', isSelect: false}, {name: '33', isSelect: false}]}
      ]
    }
  },
  methods: {
    getItem (index, i) {
    this.listData.forEach((el,idx)=>{
        if(index === idx){
          el.itemData.forEach((v,id)=>{
           if(id === i){
             v.isSelect = true;
           } else {
               v.isSelect = false;
            } 
          })
        }
      })
    //   console.log(index, i)
    }
  }
}
</script>
<style scoped>
    li{
        display:inline-block;
    }
    li>span{
        display:block;
        background:red;
    }
    li>div{
        background:green;
        margin:10px;
        padding:30px 50px;
        display:inline-block;
    }
    li>div.active{
        background:orange;
    }
</style>
