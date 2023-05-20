<script setup>
import { GetBrand } from "../request/api";
import{Search} from "@element-plus/icons-vue"
</script>
<template>
  <el-dialog v-model="Dressdialog" title="发布详情" width="50%">
    <el-image :src="Dress.url" style="width: 400px; height: 200px" fit="scale-down"></el-image>
    <h3>{{ Dress.name }}</h3>
    <p>简介：{{ Dress.detail }}</p>
    <el-carousel :interval="5000" arrow="always" height="400px" fit="scale-down">
      <el-carousel-item v-for="item in Dress.images" :key="item">
        <el-image :src="item.name" />
      </el-carousel-item>
    </el-carousel>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Dressdialog = false">退出</el-button>
      </span>
    </template>
  </el-dialog>
  <el-container>
    <el-container>
      <el-main>
        <div class="BrandMain">
          <div class="header" style="text-align:left;border-bottom: 1px solid #E4E7ED;padding-bottom: 10px;">
            <span style="font-size: larger; color: #303133;margin-left:50px">品牌发布</span>            
            <el-input
              v-model="filtername"
              class="w-50 m-2"
              size="large"
              placeholder="搜索品牌发布"
            />
            <span style="margin-left:10px">
            <el-button @click="searchByName()" :icon="Search" circle/>
           </span>
          </div>
          <div class="Bshow">
            <el-card v-for="item in DressCard" :key="item.ID">
              <el-image :src="item.ImageURL" fit="scale-down"></el-image>
              <span>{{ item.Name }}</span>
              <div style="margin-top: 5px;">
               <el-button text @click=cardDetail(item)>详情</el-button>
              </div>
            </el-card>
          </div>
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
    };
  },
  beforeMount() {
    this.LordDress();
  },
  methods: {
    searchByName() {
      // console.log(type)
      GetBrand({
        page: this.CurrentPage,
        size: this.PageSize,
        name: this.filtername,
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
      GetBrand({ page: this.CurrentPage, size: this.PageSize }).then((res) => {
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
.Bshow {
  margin-top:10px ;
  display: flex;
  width: 1280px;
  background-color: #fff;
  flex-wrap: wrap;
  justify-content: space-between;
}
.Bshow .el-card {
  /* display: flex;
    justify-content: left; */
  margin-top: 10px;
  height: 350px;
  width: 400px;
}
.Bshow .el-card .el-image {
  width: 350px;
  height: 220px;
}
.el-menu-item span {
  /* margin-left: 10px; */
  font-size: 16px;
}
</style>