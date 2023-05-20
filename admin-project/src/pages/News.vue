<template>
  <h3>新闻管理</h3>
  <span>
    按类型搜索
    <el-select v-model="filtertype">
      <el-option value="industry" label="行业资讯"></el-option>
      <el-option value="school_company" label="校企合作"></el-option>
    </el-select>
    <el-button @click="searchByType()">搜索</el-button>
  </span>
  <span>
    按名称搜索
    <el-input style="width: 300px" v-model="filtername" />
    <el-button @click="searchByName()">搜索</el-button>
  </span>
  <div>
    <el-button @click="getnews()">刷新数据</el-button>
    <el-button @click="OpenDialog1()">上传新闻</el-button>
  </div>
  <el-dialog v-model="dialogVisible1" title="创建新闻">
    <span>新闻标题:<el-input v-model="createnews.title"></el-input></span>
    <span>新闻内容 <el-input :rows="20" type="textarea" v-model="createnews.main"></el-input></span>
    <span
      >新闻类型
      <el-select v-model="createnews.type">
        <el-option value="industry" label="行业资讯"></el-option>
        <el-option value="school_company" label="校企合作"></el-option>
      </el-select>
    </span>
    <input type="file" @change="getfile($event)" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">Cancel</el-button>
        <el-button type="primary" @click="CreateNews()"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible2" title="修改新闻">
    <h3>新闻id:{{ createnews.id }}</h3>
    <span>标题:<el-input v-model="createnews.title"></el-input></span>
    <span>正文 <el-input :rows="20" type="textarea" v-model="createnews.main"></el-input></span>
    <span
      >类型
      <el-select v-model="createnews.type">
        <el-option value="industry" label="行业资讯"></el-option>
        <el-option
          value="school_company"
          label="校企合作"
        ></el-option> </el-select
    ></span>
    <h3>图片预览</h3>
    <span>替换图片 <input type="file" @change="getfile($event)" /></span>
    <el-image fit="scale-down" :src="createnews.image" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="Update()"> 保存修改 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog :show-close="false" v-model="dialogVisible3" title="编辑图片集">
    <h3>新闻id:{{ createnews.id }}</h3>
    <h3>新闻名称:{{ createnews.title }}</h3>
    <h3>类型:{{ createnews.type }}</h3>
    <h3>图片集</h3>
    <span
      >选择文件<input type="file" @change="getfile($event)" />
      <el-button @click="uploadimages()">上传图片</el-button>
    </span>
    <span v-for="(item, index) in createnews.images" :key="item">
      <el-image :src="item.name"></el-image>
      <el-button @click="deleteimage(item.id, index)">删除图片</el-button>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="GetDataById()">刷新图片集</el-button>
        <el-button @click="CloseDialog3()">关闭编辑框</el-button>
      </span>
    </template>
  </el-dialog>
  <el-table :data="newstable" style="width: 80%">
    <el-table-column prop="ID" label="新闻ID" width="180" />
    <el-table-column prop="Title" label="标题" width="180" />
    <el-table-column prop="Type" label="类型" width="180" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)"
          >删除</el-button
        >
        <el-button size="small" @click="handleImage(scope.row)"
          >图片集编辑</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    layout="sizes,prev, pager, next,jumper"
    v-model:current-page="CurrentPage"
    v-model:page-size="PageSize"
    v-model:page-sizes="PageSizes"
    @update:current-page="LordNews()"
    @update:page-size="LordNews()"
    :total="1000"
  />
</template>
<script>
import {
  Delete,
  DeleteImage,
  GetNews,
  NewNews,
  UploadNews,
  UploadImages,
  GetById,
} from "../request/api";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      imgList: [],
      createnews: {
        title: "",
        main: "",
        type: "",
        image: "",
        images: [],
      },
      CurrentPage: 1,
      PageSize: 10,
      newstable: [],
      PageSizes: [4, 6, 10, 20],
      updateID: 0,
      filtername: "",
      filtertype: "",
    };
  },
  beforeMount() {
    this.LordNews();
  },
  methods: {
    searchByName() {
      GetNews({
        page: this.CurrentPage,
        size: this.PageSize,
        name: this.filtername,
      }).then((res) => {
        this.newstable = JSON.parse(JSON.stringify(res.data));
        console.log(this.newstable[0]);
        for (let i = 0; i < this.newstable.length; i++) {
          this.newstable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.newstable[i].ImageURL}`;
        }
        // console.log(this.DressCard[0].ImageURL)
      });
    },
    searchByType() {
      GetNews({
        page: this.CurrentPage,
        size: this.PageSize,
        type: this.filtertype,
      }).then((res) => {
        this.newstable = JSON.parse(JSON.stringify(res.data));
        console.log(this.newstable[0]);
        for (let i = 0; i < this.newstable.length; i++) {
          this.newstable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.newstable[i].ImageURL}`;
        }
        // console.log(this.DressCard[0].ImageURL)
      });
    },
    getnews() {
      this.LordNews();
      // console.log(this.newstable)
    },
    OpenDialog1() {
      this.clearNews()
      this.dialogVisible1 = true;
    },
    upload() {
      console.log("假装我上传了");
      console.log(this.imgList);
    },
    getfile(e) {
      (this.imgList[0] = e.target.files[0]), console.log(this.imgList);
    },
    CreateNews() {
      this.dialogVisible1 = false;
      NewNews(
        this.createnews.title,
        this.createnews.main,
        this.createnews.type,
        this.imgList[0]
      )
        .then(() => {
          alert("上传成功");
          // console.log(res)
          this.LordNews();
        })
        .catch((err) => {
          console.log(err);
          this.LordNews();
        });
    },
    LordNews() {
      let params = {
        page: this.CurrentPage,
        size: this.PageSize,
      };
      GetNews(params).then((res) => {
        this.newstable = JSON.parse(JSON.stringify(res.data));
        console.log(this.newstable[0]);
        for (let i = 0; i < this.newstable.length; i++) {
          this.newstable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.newstable[i].ImageURL}`;
        }
        // console.log(this.DressCard[0].ImageURL)
      });
    },
    clearNews() {
      //初始化结构
      this.createnews.id = 0;
      this.createnews.title = "";
      this.createnews.main = "";
      this.createnews.type = "";
      this.createnews.image = "";
      this.createnews.images = [];
    },
    handleEdit(row) {
      this.dialogVisible2 = true;
      this.createnews.id = row.ID;
      this.createnews.title = row.Title;
      this.createnews.main = row.Main;
      this.createnews.type = row.Type;
      this.createnews.image = row.ImageURL;
    },
    Update() {
      UploadNews(
        this.createnews.id,
        this.createnews.title,
        this.createnews.main,
        this.createnews.type,
        this.imgList[0]
      )
        .then(() => {
          this.LordNews();
          alert("上传成功");
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogVisible2 = false;
      this.clearNews();
    },
    handleDelete(row) {
      ElMessageBox.confirm(
        `确定要删除该列吗 ID:${row.ID},名称${row.Title}`,
        "Warning",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
          Delete("news", row.ID)
            .then(() => {
              this.LordNews();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    },
    handleImage(row) {
      this.createnews.id = row.ID;
      this.createnews.title = row.Title;
      this.createnews.type = row.Type;
      // this.createcloth.images=row.images
      this.createnews.images = row.images.map((v) => {
        v.name = `http://101.42.21.155/images/${v.name}`;
        return { id: v.id, name: v.name };
      });
      // console.log(this.createnews.images);
      this.dialogVisible3 = true;
    },
    getfileList(e) {
      this.imgList = [];
      this.imgList = e.target.files;
    },
    uploadimages() {
      if (this.createnews.images.length >= 20) {
        alert("图片集最多只能有20张图片");
      } else if (this.imgList.length == 0) {
        alert("请上传图片");
      } else {
        UploadImages("news", this.createnews.id, this.imgList)
          .then(() => {
            alert("上传成功");
            this.GetDataById();
          })
          .catch(() => {
            alert("上传失败");
          });
      }
    },
    deleteimage(id, index) {
      DeleteImage(id)
        .then(() => {
          alert("删除成功");
          // console.log(index)
          this.GetDataById()
        })
        .catch(() => {
          alert("删除失败");
        });
    },
    CloseDialog3() {
      this.LordNews();
      this.dialogVisible3 = false;
    },
    GetDataById(){
      GetById('news',this.createnews.id).then((res)=>{
        alert('数据更新')
        this.createnews.id=res.data.ID
        this.createnews.images=res.data.images.map((v) => {
        v.name = `http://101.42.21.155/images/${v.name}`;
        return { id: v.id, name: v.name };
      });
      }).catch((err)=>console.log(err))
    }
  },
};
</script>

<style>
</style>