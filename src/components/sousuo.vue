<!--
 * @Author: 41
 * @Date: 2021-11-15 16:38:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-24 00:38:49
 * @Description:
-->
<template>
  <!-- 搜索框最外边框，动画变化的边框，从圆形变成长条形圆角 -->
  <!-- @mouseout="deactiveBox" -->
  <div class="search-box" @mouseover="activeBox" @click.stop="stop" >
    <!-- 左侧搜索框 -->
    <div class="key">
      <input
        @keyup.enter="searchCity"
        v-model="city"
        type="text"
        placeholder="请输入搜索关键词..."
      />
    </div>
    <!-- 右侧搜索按钮 -->
    <div class="bt" @click="locationCity">
      <a href="javascript:;">
        <i class="iconfont icon-suozaidi"></i>
      </a>
      <audio :src="require('../assets/mp3/switch2_1.mp3')"  id="audio_sousuo2" ></audio>
      <audio :src="require('../assets/mp3/switch.mp3')"  id="audio_sousuo" ></audio>
    </div>

    <!-- <h1>{{this.city}}</h1> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props:{
    flag: {
      type: Boolean,
      default: false
    }
  },
  watch:{
    flag(){
      console.log('check'+this.flag);
      if(this.flag===true){
        this.deactiveBox()
      }

    }
  },
  data() {
    return {
      city: "长沙",
      lastFlag:false
    };
  },
  methods: {
    activeBox() {
      let audio_sousuo2=document.querySelector('#audio_sousuo2')
      let box = document.querySelector(".search-box");
      box.classList.add("active");
      this.$emit("sousuoFlag", false);
      // let audio=document.querySelector('#audio_sousuo')
      if(this.lastFlag===false){
        // audio.play()
        audio_sousuo2.play()
        this.lastFlag=true
      }
    },
    deactiveBox() {
      let audio=document.querySelector('#audio_sousuo')
      if(this.lastFlag===true){
        audio.play()
        this.lastFlag=false
      }
      let box = document.querySelector(".search-box");
      box.classList.remove("active");
     

    },
    searchCity() {
      this.$emit("getSearch", this.city);
      console.log(this.city);
    },
    stop(){
      console.log('阻止事情冒泡！');
    },
    locationCity() {
      let that = this;

      if (window.navigator.geolocation) {
        let options = {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0,
        };
        window.navigator.geolocation.getCurrentPosition(
          success,
          error,
          options
        );
      } else {
        console.log("该浏览器不支持定位");
      }
      
      // 成功回调
      function success(position) {
        console.log(position);
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        console.log("经纬度:", longitude, latitude);

        // BaiduMap JS API
        let point = new BMap.Point(longitude, latitude);

        let geocoder = new BMap.Geocoder();
        geocoder.getLocation(point, (rs) => {
          let addComp = rs.addressComponents;
          console.log("您所在城市：" + addComp.city);
          that.city=addComp.city
          that.$emit("getSearch", addComp.city);
        });
      }
      // 失败回调
      function error(err) {
        const geolocation =new BMap.Geolocation();
        geolocation.getCurrentPosition(function(pos){
          that.city= pos.address.city;
          that.$emit("getSearch", pos.address.city);
        });
        switch (err.code) {
          case 1:
            console.log("位置服务被拒绝！切换模式！");
            break;
          case 2:
            console.log("暂时获取不到位置信息！切换模式！");
            break;
          case 3:
            console.log("获取位置信息超时！切换模式！");
            break;
          case 4:
            console.log("未知错误！切换模式！");
            break;
        }
      }
    },
    
  },
  created(){
    this.locationCity()
  },
  mounted(){
    
  }
};
</script>

<style scoped>
.search-box {
  margin: 10px 20px;
  width: 60px;
  height: 40px;
  background-color: #999;
  border-radius: 50px;
  /* 垂直居中，左右居左 */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: 0.5s;
  box-sizing: border-box;
}
.key {
  /* flex布局中本区域的缩放比例为1份 */
  flex-shrink: 1;
  flex-grow: 1;
  margin-left: 20px;
  /* background-color: violet; */
}
.key input {
  width: calc(100% - 40px);
  height: 40px;
  font-size: 18px;
  color: #fff;
  /* 边框背景为空 */
  background: none;
  border: none;
  outline: none;
}

.key input:focus {
  border: none;
  outline: none;
}

.key input::-webkit-input-placeholder {
  /* 提示文字的样式 */
  color: #999;
}

.bt {
  /* flex布局中本区域的缩放比例为0份，不缩放，保持原有大小 */
  margin-left: -50px;
  flex-shrink: 0;
  flex-grow: 0;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  /* 搜索图标居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.bt a {
  padding: 7px 10px;
  border-radius: 100%;
  text-decoration: none;
  color: #fff;
  /* background-color: violet; */
  transition: 0.5s;
}

.search-box.active {
  width: 300px;
}

.search-box.active .bt a {
  background-color: rgb(63, 59, 59);
}
</style>
