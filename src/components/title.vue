<!--
 * @Author: 41
 * @Date: 2021-11-13 20:10:54
 * @LastEditors: 41
 * @LastEditTime: 2021-11-16 11:08:43
 * @Description:
-->
<template>
    <div class='contain'>
        <h3> ______________ </h3>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scope>
.contain{
    /* width: 100vw;
    height: 100vh; */
    /* background-color: #000; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.contain h3{
    position: relative;
    font-size: 20px;
    color:#544e58
}
.contain h3:before{
    font-style:italic;
    position: absolute;
    /* 这里必须是Unicode编码 */
    content: '\963f\91cc\5df4\5df4\4e94\76d7';
    /* 颜色改为透明让背景色显示出来 */
    color:transparent;
    /* 使用linear-gradient函数生成一个渐变图片做背景 */
    background-image: linear-gradient(to right, #bed742, #f8aba6, #585eaa, #ed1941, #7fb80e, #f26522, #ffc20e, #7c8577, #009ad6, #65c294, #f47920, #f15b6c, #2e3a1f);
    /* 这个谷歌浏览器不起作用 */
    background-clip: text;
    /* 谷歌浏览器适配 */
    -webkit-background-clip: text;
    /* 制作一个斜矩形遮罩 使用polygon方法 */
    /* 矩形需要定义四个角的坐标，顺时针方向定义
    分别位左上，右上，右下，左下  单位为百分比*/
    clip-path:polygon(-20% 0%,0% 0%, -10% 100%,-30% 100%);
    /* 增加动画 */
    animation:light 2s infinite;
}

@keyframes light{
    0%{
        clip-path:polygon(-20% 0%,0% 0%, -10% 100%,-30% 100%);
    }
    50%{
        clip-path:polygon(100% 0%,120% 0%, 110% 100%,90% 100%);
    }
    100%{
        clip-path:polygon(-20% 0%,0% 0%, -10% 100%,-30% 100%);
    }
}

</style>
