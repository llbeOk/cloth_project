<script setup>
import { GetTrend } from "../request/api";
</script>
<template>
  <el-dialog v-model="Dressdialog" title="趋势分析" width="50%">
    <el-image :src="Dress.url" style="width: 400px; height: 200px" fit="scale-down"></el-image>
    <h3>{{ Dress.name }}</h3>
    <p>简介：{{ Dress.detail }}</p>
    <el-carousel :interval="5000" arrow="always" height="400px">
      <el-carousel-item v-for="item in Dress.images" :key="item">
        <el-image :src="item.name" fit="scale-down" />
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
      <el-affix :offset="10">
        <el-menu default-active="0" class="el-menu-vertical-demo">
          <h4 class="mb-2">流行趋势</h4>
          <el-menu-item @click="LordDress()" index="1">
            <span> 全部 </span>
          </el-menu-item>
          <el-menu-item
            v-for="(item, index) in options"
            :key="item"
            @click="searchByType(item)"
            :index="index"
          >
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
          <div class="show">
            <el-card v-for="item in DressCard" :key="item.ID">
              <el-image :src="item.ImageURL" fit="scale-down"></el-image>
              <span>{{  item.Name }}</span>
              <el-button text @click="cardDetail(item)">详情</el-button>
            </el-card>
            <el-pagination
              layout="sizes,prev, pager, next,jumper"
              v-model:current-page="CurrentPage"
              v-model:page-size="PageSize"
              v-model:page-sizes="PageSizes"
              @update:current-page="LordDress()"
              @update:page-size="LordDress()"
              :total="1000"
            />
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      DressCard: [],
      Dressdialog: false,
      Dress: {
        name: "",
        detail: "",
        url: "",
        images: [],
      },
      CurrentPage: 1,
      PageSize: 10,
      PageSizes: [4, 6, 10, 20],
      filtertype: "",
      filtername: "",
      options: [
        "针织纹理",
        "未来幻想",
        "无限畅想",
        "自然之美",
        "假日怡情",
        "多元创造"
      ]
    }
  },
  beforeMount() {
    this.LordDress();
  },
  methods: {
    searchByType(type) {
      // console.log(type)
      GetTrend({
        page: this.CurrentPage,
        size: this.PageSize,
        type: type,
      }).then((res) => {
        this.DressCard = JSON.parse(JSON.stringify(res.data));
        // console.log(this.DressCard[0])
        for (let i = 0; i < this.DressCard.length; i++) {
          this.DressCard[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.DressCard[i].ImageURL}`;
        }
        // console.log(this.DressCard[0].ImageURL)
      });
    },
    LordDress() {
      GetTrend({ page: this.CurrentPage, size: this.PageSize }).then((res) => {
        this.DressCard = JSON.parse(JSON.stringify(res.data));
        // console.log(this.DressCard[0])
        for (let i = 0; i < this.DressCard.length; i++) {
          this.DressCard[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.DressCard[i].ImageURL}`;
        }
        // console.log(this.DressCard[0].ImageURL)
      });
    },

    cardDetail(item) {
      this.LordDress();
      // console.log(item)
      this.Dressdialog = true;
      this.Dress.name = item.Name;
      this.Dress.detail = item.Detail;
      this.Dress.url = `${item.ImageURL}`;
      this.Dress.images = item.images.map((v) => {
        v.name = `http://101.42.21.155/images/${v.name}`;
        return { id: v.id, name: v.name };
      });
    },
  },
};
</script>

<style>
.show {
  display: flex;
  width: 1000px;
  background-color: #fff;
  flex-wrap: wrap;
  justify-content: space-between;
}
.show .el-card {
  /* display: flex;
    justify-content: left; */
  margin: 5px;
  height: 300px;
  width: 450px;
}
.show .el-card .el-image {
  width: 400px;
  height: 220px;
}
.el-menu-item span {
  margin-left: 40px;
  font-size: 16px;
}
</style>