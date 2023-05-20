<script setup>
import { GetNews } from "../request/api";
import { Search } from "@element-plus/icons-vue";
</script>
<template>
  <el-dialog v-model="Newsdialog" :title="News.title" width="50%">
    <el-image :src="News.url" style="width: 400px; height: 200px" fit="scale-down"></el-image>
    <h3>{{ News.title }}</h3>
    <p>{{ News.main }}</p>
    <el-carousel :interval="5000" arrow="always" height="400px">
      <el-carousel-item v-for="item in News.images" :key="item">
        <el-image :src="item.name" fit="scale-down" />
      </el-carousel-item>
    </el-carousel>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Newsdialog = false">退出</el-button>
      </span>
    </template>
  </el-dialog>
<el-container>
      <el-main>
        <div class="main">
          <h3>行业资讯</h3>
          <div style="text-align:right;margin-right: 30px;">
          <el-input
              v-model="filtername"
              class="w-50 m-2"
              size="large"
              placeholder="搜索行业资讯"
            />
            <span style="margin-left:10px">
            <el-button @click="searchByName()" :icon="Search" circle/>
           </span>
          </div>
          <div class="Nshow">
            <div class="Newscard" v-for="item in NewsCard" :key="item.ID">
              <el-image :src="item.ImageURL" fit="scale-down"></el-image>
              <!-- <span>{{ item.Title }}</span> -->
              <span>
                <el-link @click="cardDetail(item)" :underline="false">{{ item.Title }}</el-link>
                <span style="margin-left:20px;font-size: small;color: Secondary Text;">时间:{{item.CreatedAt}}</span> 
              </span>
            </div>
            <el-pagination
              layout="sizes,prev, pager, next,jumper"
              v-model:current-page="CurrentPage"
              v-model:page-size="PageSize"
              v-model:page-sizes="PageSizes"
              @update:current-page="LordNews()"
              @update:page-size="LordNews()"
              :total="1000"
            />
          </div>
        </div>
      </el-main>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      NewsCard: [],
      Newsdialog: false,
      News: {
        title: "",
        main: "",
        url: "",
        images: [],
      },
      CurrentPage: 1,
      PageSize: 10,
      PageSizes: [4, 6, 10, 20],
      filtername: "",
    };
  },
  beforeMount() {
    this.LordNews();
  },
  methods: {
    searchByName() {
      // console.log(type)
      GetNews({
        page: this.CurrentPage,
        size: this.PageSize,
        name: this.filtername,
      }).then((res) => {
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
    LordNews() {
      GetNews({ page: this.CurrentPage, size: this.PageSize,type:'school_company' }).then((res) => {
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

    cardDetail(item) {
      this.LordNews();
      // console.log(item)
      this.Newsdialog = true;
      this.News.title = item.Title;
      this.News.main = item.Main;
      this.News.url = `${item.ImageURL}`;
      this.News.images = item.images.map((v) => {
        v.name = `http://101.42.21.155/images/${v.name}`;
        return { id: v.id, name: v.name };
      });
    },
  },
};
</script>

<style>
.Nshow {
  display: flex;
  width: 1000px;
  background-color: #fff;
  flex-wrap: wrap;
  justify-content: space-between;
}
.Nshow .Newscard {
  border-bottom: 1px solid #E4E7ED;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  height: 200px;
  width: 900px;
}
.Newscard .el-image {
  width: 150px;
  height: 200px;
}
.el-menu-item span {
  margin-left: 40px;
  font-size: 16px;
}
.el-link{
  margin-left: 20px;
  color: black;
  font-size: large;
  text-decoration: none;
}
.el-link :hover{
  color: black;
  text-decoration:underline ;
}
</style>