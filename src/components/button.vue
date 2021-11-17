<!--
 * @Author: 41
 * @Date: 2021-11-17 16:21:59
 * @LastEditors: 41
 * @LastEditTime: 2021-11-17 17:53:30
 * @Description:
-->
<template>
    <div class="switch">
        <div class="btn" @click.stop="changeFlag"></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      flag: false
    }
  },
  methods: {
    changeFlag () {
      console.log('click test')
      let btn = document.querySelector('.btn')
      if (!this.flag) {
        btn.classList.add('on')
        this.flag = true
      } else {
        btn.classList.remove('on')
        this.flag = false
      }
      console.log('mybutton-emit前' + this.flag)
      this.$emit('mybuttonFlag', this.flag)
    }
  }
}
</script>

<style scoped>
.switch{
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--background-color);
    border: 3px solid var(--background-color);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn{
    position: relative;
    padding: 1px 1px;
    box-sizing: border-box;
    width: 25px;
    height: 30px;
    background: var(--background-color);
    border-radius: 6px;
    border: 2px solid #000;
    cursor: pointer;
}
.btn::before{
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 70%;
    background: linear-gradient(#fff,#fff);
    border-radius: 4px;
}
.btn::before{
    top: 0;
}
.on::before{
    top: 30%;
}
</style>
