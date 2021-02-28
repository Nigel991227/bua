<template>
  <div class="app">
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="one">
        <div class="main" v-if="info">
          <i class="icon" :class="info.code==0?'icon-chenggongshibaijinhangzhong-02':'icon-chenggongshibaijinhangzhong-03'"></i>
          <div class="text">{{info.msg}}</div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item id="one">
        <mt-button type="primary" @click="sub" v-if="info.code!=0"
          >返回上一步</mt-button
        >
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "APP",
  data() {
    return {
      info: null, //
      selected: "one",
    };
  },
  methods: {
      sub:function(){
          this.$router.push({
              name:'index',
          })
      }
  },
  mounted() {
    let inf= this.$route.query.data;
    this.info=inf

  },
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main {
  width: 100%;
  height: calc(100vh - 63px);
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.icon {
  display: flex;
  font-size: 8rem;
}
.icon-chenggongshibaijinhangzhong-03{
    color:#d81e06;
}
.icon-chenggongshibaijinhangzhong-02{
    color:#0ec71a;
}
.text{
    font-size: 1.6rem;
}
</style>
