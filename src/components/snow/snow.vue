<template>
    <div class="snow">
        <div class="box" />
    </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {};
  },
  mounted() {
    this.draw();
  },

  methods: {
    draw() {
      let box = document.querySelector(".box");
      // 最大宽度
      let maxWidth = box.offsetWidth;
      // 最大高度
      let maxHeight = box.offsetHeight;

      setInterval(() => {
        snowMove();
      }, 200);

      function snowMove() {
        // 1.js 创建 img
        let snowImg = document.createElement("img");
        snowImg.className = 'snow'
        // 2.图片大小 随机
        snowImg.style.width = parseInt(Math.random() * 25 + 5) + "px";
        // 3.图片位置 随机
        snowImg.style.left = parseInt(Math.random() * maxWidth) + "px";
        snowImg.src = "../../../static/img/xuehua.webp";
        box.appendChild(snowImg);
        // 4.下落速度 随机
        let speed = parseInt(Math.random() * 35 + 5);

        setInterval(() => {
          let top = snowImg.offsetTop;
          if (top > maxHeight) {
            box.removeChild(snowImg);
          } else {
            top += speed;
            snowImg.style.top = top + "px";
          }
        }, 100);
      }
    },
  },
};
</script>

<style>
.box {
  overflow: hidden;
  position: absolute;
  height: 100vh;
  width: 100vw;
}

.box .snow {
  position: absolute;
  left: 0px;
  top: 50px;
  transition: all 0.5s ease-out;
}
</style>
