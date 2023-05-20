<template>
  <h3>流行趋势</h3>
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
    <el-button @click="GetTrend()">刷新数据</el-button>
    <el-button @click="OpenDialog1()">新建趋势</el-button>
  </div>
  <el-dialog v-model="dialogVisible1" title="创建趋势">
    <span>趋势名称:<el-input v-model="createtrend.name"></el-input></span>
    <span>简介 <el-input :rows="5" type="textarea" v-model="createtrend.detail"></el-input></span>
    <span>类型 <el-select v-model="createtrend.type" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
    </el-select></span>
    <input type="file" @change="getfile($event)" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">Cancel</el-button>
        <el-button type="primary" @click="CreateTrend()"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible2" title="修改">
    <h3>趋势id:{{ createtrend.id }}</h3>
    <span>趋势名称:<el-input v-model="createtrend.name"></el-input></span>
    <span>简介 <el-input :rows="5" type="textarea" v-model="createtrend.detail"></el-input></span>
    <span>类型 <el-select v-model="createtrend.type" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
    </el-select></span>
    <h3>图片预览</h3>
    <span>替换图片 <input type="file" @change="getfile($event)" /></span>
    <el-image fit="scale-down" :src="createtrend.image" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="Update()"> 保存修改 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog 
  :show-close="false"
  v-model="dialogVisible3" 
  title="编辑图片集">
    <h3>趋势id:{{ createtrend.id }}</h3>
    <h3>趋势名称:{{ createtrend.name }}</h3>
    <h3>类型:{{ createtrend.type }}</h3>
    <h3>图片集</h3>
    <span>选择文件<input type="file" @change="getfile($event)" />
    <el-button @click="uploadimages()">上传图片</el-button>
    </span>
    <span v-for="(item,index) in createtrend.images" :key="item">
    <el-image :src="item.name"></el-image>
    <el-button @click="deleteimage(item.id,index)">删除图片</el-button>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="GetDataById()">刷新图片集</el-button>
        <el-button @click="CloseDialog3()">关闭编辑框</el-button>
      </span>
    </template>
  </el-dialog>
  <el-table :data="trendtable">
    <el-table-column prop="ID" label="布料ID" width="180" />
    <el-table-column prop="Name" label="布料名称" width="180" />
    <el-table-column prop="Type" label="布料类型" width="180" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)"
          >修改</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
          >删除</el-button>
          <el-button size="small" @click="handleImage(scope.row)">图片集编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    layout="sizes,prev, pager, next,jumper"
    v-model:current-page="CurrentPage"
    v-model:page-size="PageSize"
    v-model:page-sizes="PageSizes"
    @update:current-page="LordTrend()"
    @update:page-size="LordTrend()"
    :total="1000"
  />
</template>

<script>
import {Delete, DeleteImage, GetTrend, NewTrend ,UploadTrend,UploadImages, GetById} from "../request/api";
import { ElMessage, ElMessageBox } from 'element-plus';
export default {
  data() {
    return {
      trendtable: [],
      createtrend: {
        id:'',
        name:'',
        type:'',
        detail:'',
        image:'',
        images:[]
      },
      imgList: [],
      CurrentPage: 1,
      PageSize: 10,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      PageSizes: [4, 6, 10, 20],
      updateID: 0,
      filtername:'',
      filtertype:'',
      options: [
          {
            value: "针织纹理",
            label: "针织纹理",
          },
          {
            value: "未来幻想",
            label: "未来幻想",
          },
          {
            value: "无限畅想",
            label: "无限畅想",
          },
          {
            value: "自然之美",
            label: "自然之美",
          },
          {
            value: "假日怡情",
            label: "假日怡情",
          },
          {
            value: "多元创造",
            label: "多元创造",
          },
          {
            value: "其他",
            label: "其他",
          },
        ],
    };
  },
  beforeMount() {
    this.LordTrend();
  },
  methods: {
    searchByName(){
      GetTrend({ page: this.CurrentPage, size: this.PageSize,name:this.filtername }).then((res) => {
        this.trendtable = JSON.parse(JSON.stringify(res.data));
        console.log(this.trendtable[0]);
        for (let i = 0; i < this.trendtable.length; i++) {
          this.trendtable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.trendtable[i].ImageURL}`;
        }
      });
    },
    searchByType(){
      GetTrend({ page: this.CurrentPage, size: this.PageSize,type:this.filtertype }).then((res) => {
        this.trendtable = JSON.parse(JSON.stringify(res.data));
        console.log(this.trendtable[0]);
        for (let i = 0; i < this.trendtable.length; i++) {
          this.trendtable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.trendtable[i].ImageURL}`;
        }
      });
    },
    OpenDialog1(){
      this.clearTrend()
      this.dialogVisible1=true
    },
    LordTrend() {
      GetTrend({ page: this.CurrentPage, size: this.PageSize }).then((res) => {
        this.trendtable = JSON.parse(JSON.stringify(res.data));
        console.log(this.trendtable[0]);
        for (let i = 0; i < this.trendtable.length; i++) {
          this.trendtable[
            i
          ].ImageURL = `http://101.42.21.155/images/${this.trendtable[i].ImageURL}`;
        }
      });
    },
    getfile(e) {
      (this.imgList[0] = e.target.files[0]), console.log(this.imgList);
    },
    CreateTrend() {
      NewTrend(this.createtrend.name,
             this.createtrend.detail,
             this.createtrend.type,
             this.imgList[0]).then(()=>{
              alert('上传成功')
              this.LordTrend()
              // console.log(res)
             }).catch((err)=>{
              console.log(err);
             })
      this.dialogVisible1 = false;
    },
    clearTrend() {
      //初始化结构
      this.createtrend.id = 0;
      this.createtrend.name = "";
      this.createtrend.detail = "";
      this.createtrend.type = "";
      this.createtrend.image = "";
      this.createtrend.images = [];
    },
    handleEdit(row) {
      this.dialogVisible2 = true;
      this.createtrend.id = row.ID;
      this.createtrend.name = row.Name;
      this.createtrend.detail = row.Detail;
      this.createtrend.type = row.Type;
      this.createtrend.image = row.ImageURL;
      console.log(row)
      console.log(this.createtrend)
    },
    Update() {
      UploadTrend(
        this.createtrend.id,
        this.createtrend.name,
        this.createtrend.detail,
        this.createtrend.type,
        this.imgList[0]
      )
        .then(() => {
          this.LordTrend();
          alert("上传成功");
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogVisible2 = false;
      this.clearTrend();
    },
    handleDelete(row) {
      ElMessageBox.confirm(`确定要删除该列吗 ID:${row.ID},名称${row.Name}`, "Warning", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
          Delete('trend',row.ID).then(()=>{
            this.LordTrend()
          }).catch((err)=>{
            console.log(err);
          })
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    },
    handleImage(row){
      this.createtrend.id=row.ID
      this.createtrend.name=row.Name
      this.createtrend.type=row.Type
      // this.createtrend.images=row.images
      this.createtrend.images=row.images.map((v)=>{
        v.name=`http://101.42.21.155/images/${v.name}`
        return {id:v.id,name:v.name}
      })
      console.log(this.createtrend.images);
      this.dialogVisible3=true
    },
    getfileList(e){
      this.imgList=[]
      this.imgList=e.target.files
    },
    uploadimages(){
    if(this.createtrend.images.length>=20){
      alert('图片集最多只能有20张图片')
    }
    else if(this.imgList.length==0){
      alert('请上传图片')
    }
    else{
      UploadImages('trend',this.createtrend.id,this.imgList).then(()=>{
        alert('上传成功');
        this.GetDataById()
      }).catch(()=>{
        alert('上传失败')
      })
    }
  },
  deleteimage(id,index){
    DeleteImage(id).then(()=>{
      alert('删除成功')
      // console.log(index)
      this.GetDataById()
    }).catch(()=>{
      alert('删除失败')
    })
  },
  CloseDialog3(){
    this.LordTrend()
    this.dialogVisible3=false
  },
  GetDataById(){
      GetById('trend',this.createtrend.id).then((res)=>{
        alert('数据更新')
        this.createtrend.id=res.data.ID
        this.createtrend.images=res.data.images.map((v) => {
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