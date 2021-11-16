<!--
 * @Author: 41
 * @Date: 2021-11-15 16:38:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-16 14:45:05
 * @Description:
-->
<template>
  <!-- 搜索框最外边框，动画变化的边框，从圆形变成长条形圆角 -->
  <div class="search-box" @mouseover="activeBox" @mouseout="deactiveBox">
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
    </div>

    <!-- <h1>{{this.city}}</h1> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      city: "长沙",
    };
  },
  methods: {
    activeBox() {
      let box = document.querySelector(".search-box");
      box.classList.add("active");
    },
    deactiveBox() {
      let box = document.querySelector(".search-box");
      box.classList.remove("active");
    },
    searchCity() {
      this.$emit("getSearch", this.city);
      console.log(this.city);
    },
    locationCity() {
      if (window.navigator.geolocation) {
        let options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            let longitude = position.coords.longitude;
            let latitude = position.coords.latitude;

            // BaiduMap JS API
            let point = new BMap.Point(longitude, latitude);

            let geocoder = new BMap.Geocoder();
            geocoder.getLocation(point, (rs) => {
              let addComp = rs.addressComponents;
              console.log("您所在城市：" + addComp.city);
              this.$emit("getSearch", addComp.city);
            });
          },
          (error) => {
            console.log(error);
          },
          options
        );
      } else {
        alert("该浏览器不支持定位");
      }
    },
  },
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
