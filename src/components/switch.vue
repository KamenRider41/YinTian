<!--
 * @Author: 41
 * @Date: 2021-11-16 16:12:33
 * @LastEditors: 41
 * @LastEditTime: 2021-11-16 16:43:52
 * @Description:
-->
<template>
        <div id="toggle" @click='changeToggle'>
            <i class="indicator"></i>
        </div>
</template>

<script>
export default {
  data () {
    return {
      flag: true
    }
  },
  methods: {
    changeToggle () {
      const toggle = document.getElementById('toggle')
      toggle.classList.toggle('active')
      if (this.flag) {
        this.flag = false
      } else {
        this.flag = true
      }
      this.$emit('toggleChange', this.flag)
    }
  }
}
</script>

<style scoped>
#toggle{
    position: relative;
    display: block;
    width: 60px;
    height: 30px;
    border-radius: 30px;
    background: #fff;
    transition: 0.5s;
    cursor: pointer;
    box-shadow: inset 0 8px 60px rgba(0, 0, 0, 0.1),
                inset 0 8px 8px rgba(0, 0, 0, 0.1),
                inset 0 -4px 4px rgba(0, 0, 0, 0.1);
}
#toggle .indicator{
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    background: linear-gradient(to bottom,#444,#222);
    border-radius: 50%;
    transform: scale(0.9);
    box-shadow: inset 0 8px 40px rgba(0, 0, 0, 0.5),
                inset 0 4px 4px rgba(255, 255, 255, 0.2),
                inset 0 -4px 4px rgba(255, 255, 255, 0.2);
    transition:0.5s;
}
#toggle.active .indicator{
    left: 30px;
    box-shadow: inset 0 8px 40px rgba(255, 255, 255, 0.5),
    inset 0 4px 4px rgba(255, 255, 255, 0.2),
    inset 0 -4px 4px rgba(255, 255, 255, 0.2);
}
</style>
