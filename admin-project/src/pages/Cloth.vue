<template>
  <h3>面料图案管理</h3>
  <el-dialog v-model="dialogVisible1" title="创建布料">
    <span>布料图案名称:<el-input v-model="createcloth.name"></el-input></span>
    <span>简介 <el-input :rows="5" type="textarea" v-model="createcloth.detail"></el-input></span>
    <span>类型 
      <el-select v-model="createcloth.type" placeholder="Select">
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
        <el-button @click="dialogVisible1 = false">Cancel</el-button>
        <el-button type="primary" @click="CreateCloth()"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible2" title="修改">
    <h3>面料图案id:{{ createcloth.id }}</h3>
    <span>面料图案名称:<el-input v-model="createcloth.name"></el-input></span>
    <span>简介 <el-input rows="5" type="textarea" v-model="createcloth.detail"></el-input></span>
    <span>类型  <el-select v-model="createcloth.type" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select></span>
    <h3>图片预览</h3>
    <span>替换图片 <input type="file" @change="getfile($event)" /></span>
    <el-image fit="scale-down" :src="createcloth.image" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="Update()"> 保存修改 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog :show-close="false" v-model="dialogVisible3" title="编辑图片集">
    <h3>图案id:{{ createcloth.id }}</h3>
    <h3>图案名称:{{ createcloth.name }}</h3>
    <h3>类型:{{ createcloth.type }}</h3>
    <h3>图片集</h3>
    <span
      >选择文件<input type="file" @change="getfile($event)" />
      <el-button @click="uploadimages()">上传图片</el-button>
    </span>
    <span v-for="(item, index) in createcloth.images" :key="item">
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
    <el-button @click="LordCloth()">刷新页面</el-button>
    <el-button @click="OpenDialog1()">新建服装</el-button>
  </div>
  <el-table :data="clothtable">
    <el-table-column prop="ID" label="布料ID" width="180" />
    <el-table-column prop="Name" label="布料名称" width="180" />
    <el-table-column prop="Type" label="布料类型" width="180" />
    <el-table-column label="Operations">
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
    @update:current-page="LordCloth()"
    @update:page-size="LordCloth()"
    :total="1000"
  />
</template>

<script>
import {
  Delete,
  DeleteImage,
  GetById,
  GetCloth,
  NewCloth,
  UploadCloth,
  UploadImages,
} from "../request/api";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  data() {
    return {
      clothtable: [],
      createcloth: {
        id: "",
        name: "",
        type: "",
        detail: "",
        image: "",
        images: [],
      },
      imgList: [],
      CurrentPage: 1,
      PageSize: 10,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      PageSizes: [4, 6, 10, 20],
      updateID: 0,
      options: [
          {
            value: "文字图案",
            label: "文字图案",
          },
          {
            value: "植物花卉",
            label: "植物花卉",
          },
          {
            value: "几何图形",
            label: "几何图形",
          },
          {
            value: "动物图形",
            label: "动物图形",
          },
          {
            value: "卡通图案",
            label: "卡通图案",
          },
          {
            value: "欧美风格",
            label: "欧美风格",
          },
          {
            value: "人物图案",
            label: "人物图案",
          },
          {
            value: "传统文化",
            label: "传统文化",
          },{
            value: "自然风光",
            label: "自然风光",
          },{
            value: "标志标识",
            label: "标志标识",
          },{
            value: "抽象风格",
            label: "抽象风格",
          },{
            value: "涂鸦",
            label: "涂鸦",
          },{
            value: "其他",
            label: "其他",
          },
        ],
      filtertype:'',
      filtername:''
    };
  },
  beforeMount() {
    this.LordCloth();
  },
  methods: {
    searchByName(){
      GetCloth({ page: this.CurrentPage, size: this.PageSize,name:this.filtername }).then((res) => {
        this.clothtable = JSON.parse(JSON.stringify(res.data));
        // console.log(this.clothtable[0])
        for (let i = 0; i < this.clothtable.length; i++) {
          this.clothtable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.clothtable[i].ImageURL}`;
        }
      });
    },
    searchByType(){
      GetCloth({ page: this.CurrentPage, size: this.PageSize,type:this.filtertype }).then((res) => {
        this.clothtable = JSON.parse(JSON.stringify(res.data));
        // console.log(this.clothtable[0])
        for (let i = 0; i < this.clothtable.length; i++) {
          this.clothtable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.clothtable[i].ImageURL}`;
        }
      });
    },
    LordCloth() {
      GetCloth({ page: this.CurrentPage, size: this.PageSize }).then((res) => {
        this.clothtable = JSON.parse(JSON.stringify(res.data));
        // console.log(this.clothtable[0])
        for (let i = 0; i < this.clothtable.length; i++) {
          this.clothtable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.clothtable[i].ImageURL}`;
        }
      });
    },
    OpenDialog1() {
      this.clearCloth();
      this.dialogVisible1 = true;
    },
    getfile(e) {
      this.imgList[0] = e.target.files[0];
      // console.log(this.imgList)
    },
    CreateCloth() {
      NewCloth(
        this.createcloth.name,
        this.createcloth.detail,
        this.createcloth.type,
        this.imgList[0]
      )
        .then((res) => {
          alert("上传成功");
          this.LordCloth();
          // console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
      this.LordCloth();
      this.dialogVisible1 = false;
    },
    clearCloth() {
      //初始化结构
      this.createcloth.id = 0;
      this.createcloth.name = "";
      this.createcloth.detail = "";
      this.createcloth.type = "";
      this.createcloth.image = "";
      this.createcloth.images = [];
    },
    handleEdit(row) {
      this.dialogVisible2 = true;
      this.createcloth.id = row.ID;
      this.createcloth.name = row.Name;
      this.createcloth.detail = row.Detail;
      this.createcloth.type = row.Type;
      this.createcloth.image = row.ImageURL;
    },
    Update() {
      UploadCloth(
        this.createcloth.id,
        this.createcloth.name,
        this.createcloth.detail,
        this.createcloth.type,
        this.imgList[0]
      )
        .then(() => {
          this.LordCloth();
          alert("上传成功");
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogVisible2 = false;
      this.clearCloth();
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
          Delete("cloth", row.ID)
            .then(() => {
              this.LordCloth();
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
      this.createcloth.id = row.ID;
      this.createcloth.name = row.Name;
      this.createcloth.type = row.Type;
      // this.createcloth.images=row.images
      this.createcloth.images = row.images.map((v) => {
        v.name = `http://101.42.21.155/images/${v.name}`;
        return { id: v.id, name: v.name };
      });
      console.log(this.createcloth.images);
      this.dialogVisible3 = true;
    },
    getfileList(e) {
      this.imgList = [];
      this.imgList = e.target.files;
    },
    uploadimages() {
      if (this.createcloth.images.length >= 20) {
        alert("图片集最多只能有20张图片");
      } else if (this.imgList.length == 0) {
        alert("请上传图片");
      } else {
        UploadImages("cloth", this.createcloth.id, this.imgList)
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
      this.LordCloth();
      this.dialogVisible3 = false;
    },
    GetDataById(){
      GetById('cloth',this.createcloth.id).then((res)=>{
        alert('数据更新')
        this.createcloth.id=res.data.ID
        this.createcloth.images=res.data.images.map((v) => {
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