<script setup>
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'
</script>
<template>
  <el-container>
        <el-aside width="200px">
          <Sidebar></Sidebar>
        </el-aside>
        <el-container>
          <el-main>
            <div class="main">
    <div class="pic">
      <el-carousel :interval="5000"  arrow="always" height="400px">
    <el-carousel-item v-for="item in imgUrl" :key="item">
      <el-image :src=item />
    </el-carousel-item>
  </el-carousel>
    </div>
    <div class="hot">
      <span><h3>HOT 热门关键词</h3></span>
      <el-badge value="hot" v-for="item in HotMsg" :key="item" class="item">
      <el-button>{{ item }}</el-button>
      </el-badge>
      <el-input v-model="input2" size="small" placeholder="搜索关键字" />
    </div>
    <div class="news">
      <div>
        <ul class="newstable">
          <span>
          <h3 class="newsTitle">行业资讯</h3>
          <router-link to="/news">
          <a href="">more>>></a>
        </router-link>
          </span>
          <li v-for="item in NewsCard" :key="item">
            <router-link to="/news">
              <a href="">{{ item.Title }}</a>
          </router-link></li>
          <!-- <li><a href="">企业招聘</a></li>
          <li><a href="">MITHRIDATE伦敦时装周正式发布2023秋冬系列</a></li>
          <li><a href="">伦敦时装周秀场直击：MARK FAST 2023秋冬系列正式发布</a></li>
          <li><a href="">发布会时间公布</a></li> -->
        </ul>
      </div>
      <div>
        <ul class="newstable">
          <span>
          <h3 class="newsTitle">最新发布</h3>
          <router-link to="/dress">
          <a href="">more>>></a>
        </router-link>
          </span>
          <div> 
          <span v-for="item in DressCard" :key="item">
            <router-link to="/dress">
              <el-image :src=item.ImageURL fit="scale-down"/>
              {{ item.Name }}
            </router-link>
          </span>
          <!-- <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span> -->
          </div>
        </ul>
      </div>
    </div>
  </div>
          </el-main>
          <el-footer>
            <Footer></Footer>
          </el-footer>
        </el-container>
      </el-container>
</template>

<script>
  import jpg1 from './images/1.jpg'
  import jpg2 from './images/2.jpg'
  import jpg3 from './images/3.jpg'
  import {GetList, GetNews} from '../request/api'
export default {
  data:function(){
    return {
      imgUrl:[jpg1,jpg2,jpg3],
      HotMsg:['全麻面料','全毛面料','棉布','丝质面料'],
      Dress:'',
      NewsCard:[],
      DressCard:[]
    }
  },
  mounted(){
   this.LordNews()
   this.LordDress()
    },
  methods:{
    LordNews() {
      GetNews({ page: 1, size:5,type:'industry' }).then((res) => {
        this.NewsCard = JSON.parse(JSON.stringify(res.data));
        // console.log(this.NewsCard[0])
        for (let i = 0; i < this.NewsCard.length; i++) {
          this.NewsCard[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.NewsCard[i].ImageURL}`;
        }
        // console.log(this.NewsCard[0].ImageURL)
      });
    },
    LordDress(){
      GetList({page:1,size:4}).then((res)=>{
      this.DressCard=JSON.parse(JSON.stringify(res.data))
      // console.log(this.DressCard[0])
      for(let i = 0;i<this.DressCard.length;i++){
        this.DressCard[i].ImageURL=`http://101.42.21.155/images/${this.DressCard[i].ImageURL}`
      }
      // console.log(this.DressCard[0].ImageURL)
    })
    },
  }
}
</script>

<style>
 .main{
  width: 1000px;
  text-align: center;
  margin: auto;
 }
 .el-image{
  height:400px;
  width: 700px;
 }
 .img1{
  margin:0 auto;
  height:500px;
  width:900px;
  background-image: url('./images/2.jpg');
 }
 .hot{
  width: 900px;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
 }
 .hot span{
    line-height:15px;
    margin: 0 5px;
 }
 .item {
  margin-top: 10px;
  margin-left: 20px;
 }
 .el-input{
  margin-left:20px;
  margin-top:10px ;
  height: 30px;
  width:200px;
 }
 .news{
  margin-top:30px;
    display: flex;
 }
 .news div{
  width: 500px;
  height: 500px;
  border: 1px solid #DCDFE6;
 }
 .newsTitle{
  color: black;
  text-align: left;
  margin:20px 20px ;
 }
 .newstable{
  margin:10px;
 }
 .newstable span{
    display: flex;
    justify-content: space-between;
 }
 .newstable li{
  text-align: left;
  margin: 20px 20px;
  color: black;
 }
 .newstable div{
  display: flex;
  width: 400px;
  height: 400px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border:hidden;
 }
 .newstable div span{
  width: 150px;
  height:170px;
  border:1px solid #E4E7ED;
 }
 .newstable div span .el-image{
  width: 150px;
  height:170px;
 }
</style>