<template>
  <div id="app">
    <mt-tab-container v-model="selected" >
      <mt-tab-container-item id="one">
        <div class="main">
          <div class="from">
            <div class="title">
              <h3>门店信息填写</h3>
            </div>
            <mt-field
              label="姓名"
              placeholder="请输入企业法人姓名"
              v-model="form.legal_persona_name"
              @change="state"
              :disableClear="true"
            ></mt-field>
            <mt-field
              label="微信号"
              placeholder="请输入微信号"
              v-model="form.legal_persona_wechat"
              :disableClear="true"
              @change="state"
            ></mt-field>
            <mt-field
              label="企业名"
              placeholder="请输入企业名"
              v-model="form.name"
              :disableClear="true"
              @change="state"
            ></mt-field>
            <mt-field
              label="企业代码"
              placeholder="请输入企业代码"
              v-model="form.code"
              :disableClear="true"
              @change="state"
            ></mt-field>
            <mt-radio
                title="企业代码类型"
                v-model="form.code_type"
                :options="options"
                @change="state"
              >
              </mt-radio
            >
            <mt-field label="营业执照"  class="myimg" :disableClear="true">
              <div class="setimg">
                <div class="mark" :class="issrc01?'active':'' ">
                  <mt-button  @click="selectImg01" style="z-index:9;" ><i v-if="!issrc01" class="icon icon-icons01" style="font-size:1.5rem;display:block;"></i>{{text01}}</mt-button>
                </div>
                <img :src="src01"  alt="" :onerror="imgerr01">
              </div>
              <input @change="filePreview01" type="file" hidden='' id="filed01" accept="image/jpeg, image/png, image/jpg, image/gif">
            </mt-field>
            <mt-field label="食品经营许可证"  class="myimg" :disableClear="true">
              <div class="setimg">
                <div class="mark" :class="issrc02?'active':'' ">
                  <mt-button  @click="selectImg02" style="z-index:9;" ><i v-if="!issrc02" class="icon icon-icons01" style="font-size:1.5rem;display:block;"></i> {{text02}}</mt-button>
                </div>
                <img :src="src02"  alt="" :onerror="imgerr02">
              </div>
              <input @change="filePreview02" type="file" hidden='' id="filed02" accept="image/jpeg, image/png, image/jpg, image/gif">
            </mt-field>
          </div>
        </div> 
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item id="one">
        <mt-button type="primary" :disabled='btnDisabled' @click="sub">提交</mt-button>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { BaoCunWenJianPrivate,SetShangHuXinXi } from "@/services/getData.js";
import { Toast } from 'mint-ui';
export default {
  name: "App",
  data() {
    return {
      form:{
        "name": null, // 企业名
        "code": null, // 企业代码
        "code_type":"1", // 企业代码类型（1：统一社会信用代码， 2：组织机构代码，3：营业执照注册号）
        "legal_persona_wechat": null, // 法人微信
        "legal_persona_name": null, // 法人姓名
        "imgName":null,//营业执照图片地址
      },
      options:[
        {
          label: '统一社会信用代码',
          value: "1",
        },
        {
          label: '组织机构代码',
          value: "2"
        },
        {
          label: '营业执照注册号',
          value: "3"
        }
      ],
      src01:require('../assets/img01.jpeg'),
      src02:require('../assets/img02.jpeg'),
      param:'',
      issrc01:false,
      issrc02:false,
      selected:'one',
      btnDisabled:true,
      State:false,
    }
  },
  beforeCreate() {
    //组建创建完成，dom还未生成
  },
  created() {
    //组件创建后
  },
  watch: {
    State(){
      this.btnDisabled=!this.State;
    }
  },
  computed: {
    //计算属性
    imgerr01(){
      return '"this.src="' + require('../assets/img01.jpeg') + '"';
    },
    imgerr02(){
       return '"this.src="' + require('../assets/img02.jpeg') + '"';
    },
    text01(){
      if(this.issrc01)return "重新上传";
      return "上传图片";
    },
    text02(){
      if(this.issrc02)return "重新上传";
      return "上传图片";
    }
  },
  methods: {
    //函数/方法
    sub:function(){
      //提交
      if(this.State){
        //axios请求
        //上传图片获取图片名
        //提交数据到setshanghuxinxi
        BaoCunWenJianPrivate(this.param).then(res=>{
           if(res.code==0){
              this.form.imgName=res.data.ImgPath;
              SetShangHuXinXi(this.form).then(res=>{
                if(res.code==0){
                  //成功
                  // this.$router.push({
                  //   name:'info',
                  //   params:{data:res}
                  // })
                  this.$router.push({
                    path:'/info',
                    query:{data:res}
                  })
                }else{
                  //失败
                  Toast({
                    message:'提交失败,请重新提交！',
                    position:'middle',
                    duration:3000
                  });
                }
              }).catch(err=>{
                Toast({
                  message:err+",请稍后重新",
                  position:'middle',
                  duration:3000
                });
              })
           }else{
              Toast({
                  message:'图片上传失败,请重新提交！',
                  position:'middle',
                  duration:3000
              });
           }
        })
        .catch(err=>{
            Toast({
                  message:err+",请稍后重新",
                  position:'middle',
                  duration:3000
            });
        })
      }
    },
    //校验
    state:function(){
      //验证姓名
      if(!this.form.legal_persona_name)return this.State=false ;
      //验证微信号
      if(!this.form.legal_persona_wechat)return this.State=false;
      //验证企业名
      if(!this.form.name)return this.State=false;
      //验证企业代码
      if(!this.form.code)return this.State=false;
      //验证营业执照图片
      if(!this.issrc01)return this.State=false;
      //验证食品经营许可证
      if(!this.issrc02) return this.State=false;
      return this.State=true;
    },
    selectImg01:function(){
      document.getElementById('filed01').click();
    },
    selectImg02:function(){
      document.getElementById('filed02').click();
    },
    filePreview01(e){
        let _this = this
        let files = e.target.files[0]
        if (!e || !window.FileReader) return  // 判断是否支持FileReader
        let reader = new FileReader()
        // _this.param = new FormData();
        // _this.param.append('file',files);
        reader.readAsDataURL(files) // 文件转换
        reader.onloadend = function (i) {
        _this.src01 = i.target.result;
        _this.issrc01=true;
        _this.state();
      }
    },
    filePreview02(e){
        let _this = this
        let files = e.target.files[0]
        if (!e || !window.FileReader) return  // 判断是否支持FileReader
        let reader = new FileReader()
        _this.param = new FormData();
        _this.param.append('file',files);
        reader.readAsDataURL(files) // 文件转换
        reader.onloadend = function (i) {
        _this.src02 = i.target.result;
        _this.issrc02=true;
        _this.state();
      }
    },

  },
  mounted() {
    //开始
  },
};
</script>
<style>
#app {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100vw;
  text-align: left;
  margin-bottom: 40px;
}
.myimg .mint-cell-value {
  justify-content: flex-end;
}
.myimg .mint-cell-value input{
  display: none;

}
.setimg{
  width: 12rem;
  height: 9rem;
  position: relative;
  margin-right:.4rem ;
  margin-top:.4rem ;
  margin-bottom: .4rem;
}
.setimg .mark{
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  z-index: 3;
  opacity: .7;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction:row;
  justify-content: center;
  align-items: center;
  transition: height .5s;
}
.setimg .mark.active{
  height: 20%;
  bottom: 0;
  left: 0;
  opacity: 1;

}
.setimg img{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;

}
.setimg .mark button{
   width: 100%;
   height: 100%;
   background-color:transparent;
   border-style:none;
   border: none;
   color: rgb(226, 226, 226,.9);
   font-size: 1rem;
   font-weight: bold;
} 
  .setimg button:hover {

   outline: none;
    }


    /*active 要在后面 否则会被hover覆盖*/


 .setimg button:focus {

   outline: none;
    }


  .setimg button:active {
   outline: none;
}
.mint-tabbar{
  height: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: none !important;
  background-color: white !important;
}
.mint-tabbar.is-fixed{
  z-index: 999 !important;
}
.mint-tab-item {
  width: 100%;
  height: 100%;
  background: none !important;
  background-color: white !important;
  display: flex !important;
  display: -webkit-flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  align-items: center !important;
  padding-bottom: 1rem !important;
}
.mint-tab-item .mint-button{
  width: calc(100vw - 2rem);
  height: 40px;
}
.mint-field .mint-cell-title{
  width: 120px !important;
}
.mint-field-state{
  /* margin: 0px !important; */
}
.mint-cell-value{
  flex: .976 !important;
}
.mint-cell-title{
  flex: inherit !important;
}
</style>
