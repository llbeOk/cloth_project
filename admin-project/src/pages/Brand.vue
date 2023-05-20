<template>
  <h3>品牌发布管理</h3>
  <span>
    按名称搜索
  <el-input style="width:400px" v-model="filtername"/>
  <el-button @click="searchByName()">搜索</el-button>
  </span>
  <div>
    <el-button @click="LordBrand()">刷新数据</el-button>
    <el-button @click="OpenDialog1 ">新建品牌发布</el-button>
  </div>

  <el-dialog v-model="dialogVisible1" title="创建品牌发布">
    <span>发布名称:<el-input v-model="createbrand.name"></el-input></span>
    <span>简介<el-input rows="5" type="textarea" v-model="createbrand.detail"></el-input></span>      
    <input type="file" @change="getfile($event)">
    <template #footer>
    <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">Cancel</el-button>
        <el-button type="primary" @click="CreateBrand()">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible2" title="修改">
    <h3>发布id:{{ createbrand.id }}</h3>
    <span>发布名称:<el-input v-model="createbrand.name"></el-input></span>
    <span>简介 <el-input rows="5" type="textarea" v-model="createbrand.detail"></el-input></span>
    <h3>图片预览</h3>
    <span>替换图片 <input type="file" @change="getfile($event)" /></span>
    <el-image fit="scale-down" :src="createbrand.image" />
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
    <h3>发布id:{{ createbrand.id }}</h3>
    <h3>发布名称:{{ createbrand.name }}</h3>
    <h3>图片集</h3>
    <span>选择文件<input type="file" @change="getfile($event)" />
    <el-button @click="uploadimages()">上传图片</el-button>
    </span>
    <span v-for="(item,index) in createbrand.images" :key="item">
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
  <el-table :data="brandtable">
    <el-table-column prop="ID" label="品牌发布ID" width="180"/>
    <el-table-column prop="Name" label="发布名称" width="180"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit( scope.row)"
          >修改</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
          >删除</el-button
        >
        <el-button size="small" @click="handleImage(scope.row)">图片集编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { Delete, DeleteImage,GetBrand, GetById, NewBrand,UploadBrand,UploadImages } from '../request/api'
import { ElMessage, ElMessageBox } from 'element-plus';
export default {
 data(){
  return{
    dialogVisible1:false,
    dialogVisible2: false,
      dialogVisible3: false,
    createbrand:{
      id:'',
        name:'',
        detail:'',
        image:'',
        images:[]
    },
    imgList:[],
    CurrentPage:1,
    PageSize:10,
    brandtable:[],
    updateID: 0,
    filtername:''
  }
 },
 beforeMount(){
  this.LordBrand()
 },
 methods:{
    searchByName(){
      GetBrand({page:this.CurrentPage,size:this.PageSize,name:this.filtername}).then((res)=>{
        this.brandtable=JSON.parse(JSON.stringify(res.data))
      // console.log(this.brandtable[0])
      for(let i = 0;i<this.brandtable.length;i++){
        this.brandtable[i].ImageURL=`http://101.42.21.155/images/${this.brandtable[i].ImageURL}`
      }
      })
    },
    LordBrand(){
      GetBrand({page:this.CurrentPage,size:this.PageSize}).then((res)=>{
        this.brandtable=JSON.parse(JSON.stringify(res.data))
      // console.log(this.brandtable[0])
      for(let i = 0;i<this.brandtable.length;i++){
        this.brandtable[i].ImageURL=`http://101.42.21.155/images/${this.brandtable[i].ImageURL}`
      }
      })
    },
    getfile(e){
    this.imgList[0]=e.target.files[0]
    // console.log(this.imgList)
    },
    CreateBrand(){
      NewBrand(this.createbrand.name,
             this.createbrand.detail,
             this.imgList[0]).then((res)=>{
              alert('上传成功')
              this.LordBrand()
              // console.log(res)
             }).catch((err)=>{
              // console.log(err);
             })
      this.dialogVisible1=false
    },
    clearBrand() {
      //初始化结构
      this.createbrand.id = 0;
      this.createbrand.name = "";
      this.createbrand.detail = "";
      this.createbrand.image = "";
      this.createbrand.images = [];
    },
    OpenDialog1(){
      this.clearBrand()
      this.dialogVisible1=true
    },
    handleEdit(row) {
      this.dialogVisible2 = true;
      this.createbrand.id = row.ID;
      this.createbrand.name = row.Name;
      this.createbrand.detail = row.Detail;
      this.createbrand.image = row.ImageURL;
    },
    Update() {
      UploadBrand(
        this.createbrand.id,
        this.createbrand.name,
        this.createbrand.detail,
        this.imgList[0]
      )
        .then(() => {
          this.LordBrand();
          alert("上传成功");
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogVisible2 = false;
      this.clearBrand();
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
          Delete('brand',row.ID).then(()=>{
            this.LordBrand()
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
      this.createbrand.id=row.ID
      this.createbrand.name=row.Name
      // this.createbrand.images=row.images
      this.createbrand.images=row.images.map((v)=>{
        v.name=`http://101.42.21.155/images/${v.name}`
        return {id:v.id,name:v.name}
      })
      console.log(this.createbrand.images);
      this.dialogVisible3=true
    },
    getfileList(e){
      this.imgList=[]
      this.imgList=e.target.files
    },
    uploadimages(){
    if(this.createbrand.images.length>=20){
      alert('图片集最多只能有20张图片')
    }
    else if(this.imgList.length==0){
      alert('请上传图片')
    }
    else{
      UploadImages('brand',this.createbrand.id,this.imgList).then(()=>{
        alert('上传成功');
        this.GetDataById();
      }).catch(()=>{
        alert('上传失败:可能是文件过大');
        this.GetDataById();
      })
    }
  },
  deleteimage(id,index){
    DeleteImage(id).then(()=>{
      alert('删除成功')
      // console.log(index)
      this.GetDataById();
    }).catch(()=>{
      alert('删除失败')
    })
  },
  CloseDialog3(){
    this.LordBrand()
    this.dialogVisible3=false
  },
  GetDataById(){
      GetById('brand',this.createbrand.id).then((res)=>{
        alert('数据更新')
        this.createbrand.id=res.data.ID
        this.createbrand.images=res.data.images.map((v) => {
        v.name = `http://101.42.21.155/images/${v.name}`;
        return { id: v.id, name: v.name };
      });
      }).catch((err)=>console.log(err))
    }
  }
}
</script>

<style>

</style>