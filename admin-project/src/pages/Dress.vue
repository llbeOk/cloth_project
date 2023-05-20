<template>
  <el-dialog v-model="dialogVisible1" title="创建服装">
    <span>服装名称:<el-input v-model="createdress.name"></el-input></span>
    <span>简介 <el-input rows="5" type="textarea" v-model="createdress.detail"></el-input></span>
    <span>类型
      <el-select v-model="createdress.type" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </span>
    <input type="file" @change="getfile($event)" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消上传</el-button>
        <el-button type="primary" @click="CreateDress()"> 确定上传 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible2" title="修改服装">
    <h3>服装id:{{ createdress.id }}</h3>
    <span>服装名称:<el-input v-model="createdress.name"></el-input></span>
    <span>简介 <el-input rows="5" type="textarea" v-model="createdress.detail"></el-input></span>
    <span>类型 <el-select v-model="createdress.type" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select></span>
    <h3>图片预览</h3>
    <span>替换图片 <input type="file" @change="getfile($event)" /></span>
    <el-image fit="scale-down" :src="createdress.image" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="Update()"> 保存修改 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog :show-close="false" v-model="dialogVisible3" title="编辑图片集">
    <h3>服装id:{{ createdress.id }}</h3>
    <h3>服装名称:{{ createdress.name }}</h3>
    <h3>类型:{{ createdress.type }}</h3>
    <h3>图片集</h3>
    <span
      >选择文件<input type="file" @change="getfile($event)" />
      <el-button @click="uploadimages()">上传图片</el-button>
    </span>
    <span v-for="(item, index) in createdress.images" :key="item">
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
  <h3>服装面料管理</h3>
  <span>
    按类型搜索
  <el-select v-model="filtertype" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
  </el-select>
  <el-button @click="searchByType()">搜索</el-button>
  </span>
  <span>
    按名称搜索
  <el-input style="width:300px" v-model="filtername"/>
  <el-button @click="searchByName()">搜索</el-button>
  </span>
  <div>
  <el-button @click="getdress()">刷新数据</el-button>
  <el-button @click="OpenDialog1()">上传服装</el-button>
  </div>
  <el-table :data="dresstable" style="width: 80%">
    <el-table-column prop="ID" label="服装ID" width="180" />
    <el-table-column prop="Name" label="名称" width="180" />
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
    @update:current-page="LordDress()"
    @update:page-size="LordDress()"
    :total="1000"
  />
</template>

<script>
import {
  GetById,
  Delete,
  DeleteImage,
  GetDress,
  NewDress,
  UploadDress,
  UploadImages,
} from "../request/api";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      updateID: 0,
      imgList: [],
      createdress: {
        id: "",
        name: "",
        detail: "",
        type: "",
        image: "",
        images: [],
      },
      CurrentPage: 1,
      PageSize: 10,
      dresstable: [],
      PageSizes: [4, 6, 10, 20],
      filtertype:'',
      filtername:'',
      options: [
        {
          value: "棉布",
          label: "棉布",
        },
        {
          value: "麻布",
          label: "麻布",
        },
        {
          value: "丝绸",
          label: "丝绸",
        },
        {
          value: "呢绒",
          label: "呢绒",
        },
        {
          value: "皮革",
          label: "皮革",
        },
        {
          value: "混纺",
          label: "混纺",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
    };
  },
  beforeMount() {
    this.LordDress();
  },
  methods: {
    searchByName(){
      GetDress({page:this.CurrentPage,size:this.PageSize,name:this.filtername}).then((res) => {
        this.dresstable = JSON.parse(JSON.stringify(res.data));
        // console.log(this.dresstable[0]);
        for (let i = 0; i < this.dresstable.length; i++) {
          this.dresstable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.dresstable[i].ImageURL}`;
        }
        // console.log(this.DressCard[0].ImageURL)
      });
    },
    searchByType(){
      GetDress({page:this.CurrentPage,size:this.PageSize,type:this.filtertype}).then((res) => {
        this.dresstable = JSON.parse(JSON.stringify(res.data));
        // console.log(this.dresstable[0]);
        for (let i = 0; i < this.dresstable.length; i++) {
          this.dresstable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.dresstable[i].ImageURL}`;
        }
        // console.log(this.DressCard[0].ImageURL)
      });
    },
    getdress() {
      this.LordDress();
      // console.log(this.dresstable)
    },
    OpenDialog1() {
      this.clearDress();
      this.dialogVisible1 = true;
    },
    // upload(){
    //   console.log('假装我上传了');
    //   console.log(this.imgList)
    // },
    getfile(e) {
      this.imgList[0] = e.target.files[0];
      // console.log(this.imgList)
    },
    clearDress() {
      //初始化dress结构
      this.createdress.id = 0;
      this.createdress.name = "";
      this.createdress.detail = "";
      this.createdress.type = "";
      this.createdress.image = "";
      this.createdress.images = [];
    },
    CreateDress() {
      this.dialogVisible1 = false;
      NewDress(
        this.createdress.name,
        this.createdress.detail,
        this.createdress.type,
        this.imgList[0]
      )
        .then(() => {
          alert("上传成功");
          // console.log(res)
          this.LordDress()
        })
        .catch((err) => {
          alert("上传失败辣，请检查数据和文件格式");
          console.log(err);
        });
      this.clearDress();
    },
    LordDress() {
      let params = {
        page: this.CurrentPage,
        size: this.PageSize,
      };
      GetDress(params).then((res) => {
        this.dresstable = JSON.parse(JSON.stringify(res.data));
        // console.log(this.dresstable[0]);
        for (let i = 0; i < this.dresstable.length; i++) {
          this.dresstable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.dresstable[i].ImageURL}`;
        }
        // console.log(this.DressCard[0].ImageURL)
      });
    },
    handleEdit(row) {
      this.dialogVisible2 = true;
      this.createdress.id = row.ID;
      this.createdress.name = row.Name;
      this.createdress.detail = row.Detail;
      this.createdress.type = row.Type;
      this.createdress.image = row.ImageURL;
    },
    Update() {
      UploadDress(
        this.createdress.id,
        this.createdress.name,
        this.createdress.detail,
        this.createdress.type,
        this.imgList[0]
      )
        .then((res) => {
          alert("上传成功");
          console.log(res);
          this.LordDress();
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogVisible2=false
      this.clearDress();
    },
    handleDelete(row) {
      ElMessageBox.confirm(
        `确定要删除该列吗 ID:${row.ID},名称${row.Name}`,
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
          Delete("dress", row.ID);
          this.LordDress();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    },
    handleImage(row) {
      this.createdress.id = row.ID;
      this.createdress.name = row.Name;
      this.createdress.type = row.Type;
      // this.createdress.images=row.images
      this.createdress.images = row.images.map((v) => {
        v.name = `http://101.42.21.155/images/${v.name}`;
        return { id: v.id, name: v.name };
      });
      // console.log(this.createdress.images);
      this.dialogVisible3 = true;
    },
    getfileList(e) {
      this.imgList = [];
      this.imgList = e.target.files;
    },
    uploadimages() {
      if (this.createdress.images.length >= 20) {
        alert("图片集最多只能有20张图片");
      } else if (this.imgList.length == 0) {
        alert("请上传图片");
      } else {
        UploadImages("dress", this.createdress.id, this.imgList)
          .then(() => {
            alert("上传成功");
            this.GetDataById();
          })
          .catch(() => {
            alert("上传失败");
            this.GetDataById();
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
      this.LordDress();
      this.dialogVisible3 = false;
    },
    // 想完成在dialog里更新数据的操作
    GetDataById(){
      GetById('dress',this.createdress.id).then((res)=>{
        alert('数据更新')
        this.createdress.id=res.data.ID
        this.createdress.images=res.data.images.map((v) => {
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