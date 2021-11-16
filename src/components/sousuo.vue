<!--
 * @Author: 41
 * @Date: 2021-11-15 16:38:42
 * @LastEditors: 41
 * @LastEditTime: 2021-11-16 09:29:11
 * @Description:
-->
<template>
<!-- 搜索框最外边框，动画变化的边框，从圆形变成长条形圆角 -->
    <div class="search-box" @mouseover="activeBox" @mouseout="deactiveBox">
        <!-- 左侧搜索框 -->
        <div class="key">
            <input @keyup.enter="searchCity" v-model="city" type="text" placeholder="请输入搜索关键词...">
        </div>
        <!-- 右侧搜索按钮 -->
        <div class="bt">
            <a href="" >
                <i class="iconfont icon-suozaidi"></i>
            </a>
        </div>

        <!-- <h1>{{this.city}}</h1> -->
    </div>
</template>

<script>
export default {
  data () {
    return {
      city: '长沙'
    }
  },
  methods: {
    activeBox () {
      let box = document.querySelector('.search-box')
      box.classList.add('active')
    },
    deactiveBox () {
      let box = document.querySelector('.search-box')
      box.classList.remove('active')
    },
    searchCity () {
      this.$emit('getSearch', this.city)
      console.log(this.city)
    }
  }
}
</script>

<style scoped>
.search-box {
    width: 60px;
    height: 60px;
    background-color: #999;
    border-radius: 60px;
    /* 垂直居中，左右居左 */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: 0.5s;
}
.key {
    /* flex布局中本区域的缩放比例为1份 */
    flex-shrink: 1;
    flex-grow: 1;
    /* background-color: violet; */
}
.key input {
    width: calc(100% - 40px);
    height: 40px;
    padding: 0 20px;
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
    padding: 10px;
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
