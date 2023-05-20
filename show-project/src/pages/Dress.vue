<script setup>
import { GetList } from '../request/api'
</script>
<template>
  <el-dialog
    v-model="Dressdialog"
    title="服装详情"
    width="50%"
  >
    <el-image :src="Dress.url" style="width:400px;height:200px" fit="scale-down"></el-image>
    <h3>{{ Dress.name }}</h3>
     <p>简介：{{ Dress.detail }}</p>
     <el-carousel :interval="5000"  arrow="always" height="400px">
    <el-carousel-item v-for="item in Dress.images" :key="item">
      <el-image :src=item.name fit="scale-down"/>
    </el-carousel-item>
    </el-carousel>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Dressdialog = false">退出</el-button>
      </span>
    </template>
  </el-dialog>
  <el-container>
        <el-aside width="200px">
          <el-affix :offset="120">
      <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
        >
        <h4 class="mb-2">服装面料</h4>
          <el-menu-item @click="LordDress()" index="1">
            <span>
              全部
            </span>
          </el-menu-item>
         <el-menu-item v-for="(item,index) in options" :key="item" @click="searchByType(item)" :index="index">
          <span>
            {{ item }}
          </span>
        </el-menu-item>
        </el-menu>
    </el-affix>
        </el-aside>
        <el-container>
          <el-main>
            <div class="main">
                <div class="dressshow">
                      <el-card v-for="item in DressCard" :key="item.ID" >
                      <el-image :src=item.ImageURL fit="scale-down"></el-image>
                      <span>{{item.Name}}</span>
                      <div style="color:#909399;font-size:10px;margin-top: 5px;">
                        类型:{{ item.Type }}
                        <el-button text @click=cardDetail(item)>详情</el-button>
                      </div>
                      </el-card>
                </div>
                <el-pagination layout="sizes,prev, pager, next,jumper" 
                      v-model:current-page="CurrentPage"
                      v-model:page-size="PageSize"
                      v-model:page-sizes="PageSizes"
                      @update:current-page="LordDress()"
                      @update:page-size="LordDress()"
                      :total="1000" />
            </div>
          </el-main>
        </el-container>
      </el-container>
</template>

<script>
export default {
  data(){
    return{
      DressCard:[],
      Dressdialog:false,
      Dress:{
        name:'',
        detail:'',
        url:'',
        images:[]
      },
      CurrentPage:1,
      PageSize:10,
      PageSizes:[4,6,10,20],
      filtertype:'',
      filtername:'',
      options:['棉布','麻布','丝绸','呢绒','皮革','化纤','混纺','其他']
    }
  },
  beforeMount(){
    this.LordDress()
  },
  methods:{
    searchByType(type){
      // console.log(type)
      GetList({page:this.CurrentPage,size:this.PageSize,type:type}).then((res)=>{
      this.DressCard=JSON.parse(JSON.stringify(res.data))
      // console.log(this.DressCard[0])
      for(let i = 0;i<this.DressCard.length;i++){
        this.DressCard[i].ImageURL=`http://101.42.21.155/images/${this.DressCard[i].ImageURL}`
      }
      // console.log(this.DressCard[0].ImageURL)
    })
    },
    LordDress(){
      GetList({page:this.CurrentPage,size:this.PageSize}).then((res)=>{
      this.DressCard=JSON.parse(JSON.stringify(res.data))
      // console.log(this.DressCard[0])
      for(let i = 0;i<this.DressCard.length;i++){
        this.DressCard[i].ImageURL=`http://101.42.21.155/images/${this.DressCard[i].ImageURL}`
      }
      // console.log(this.DressCard[0].ImageURL)
    })
    },
    
    cardDetail(item){
      this.LordDress()
      // console.log(item)
      this.Dressdialog=true
      this.Dress.name=item.Name
      this.Dress.detail=item.Detail
      this.Dress.url=`${item.ImageURL}`
      this.Dress.images = item.images.map((v) => {
        v.name = `http://101.42.21.155/images/${v.name}`;
        return { id: v.id, name: v.name };
      });
    }
  }
}
</script>

<style>
.dressshow{
    display: flex;
    width: 1000px;
    background-color: #fff;
    flex-wrap: wrap;
    justify-content: space-between;
}
.dressshow .el-card{
    /* display: flex;
    justify-content: left; */
    margin:10px;
    height: 350px;
    width: 300px;
}
.dressshow .el-card .el-image{
  width: 250px;
  height: 220px;
}
.el-menu-item span{
        margin-left: 5px;
        font-size: 16px;
    }
</style>