<!--
 * @Author: 41
 * @Date: 2021-11-16 16:12:33
 * @LastEditors: 41
 * @LastEditTime: 2021-11-18 10:41:19
 * @Description:
-->
<template>
        <div id="toggle" @click.stop='changeToggle'>
            <i class="indicator"></i>
            <audio :src="require('../assets/mp3/switch.mp3')" id="audio_switch" ></audio>
            <!-- <audio :src="require('../assets/click.wav')" id="audio2" ></audio> -->
        </div>

</template>

<script>
export default {
  data () {
    return {
      flag: 1
    }
  },
  methods: {
    changeToggle () {
      const toggle = document.getElementById('toggle')
      let switch1 = document.getElementById('audio_switch')
      if (this.flag === 1) {
        toggle.classList.add('active1')
        this.flag = 2
        switch1.play()
      } else if (this.flag === 2) {
        toggle.classList.remove('active1')
        toggle.classList.add('active2')
        this.flag = 3
        switch1.play()
      } else {
        toggle.classList.remove('active2')
        this.flag = 1
        switch1.play()
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
    width: 100px;
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
#toggle.active1 .indicator{
    left: 30px;
    box-shadow: inset 0 8px 40px rgba(255, 255, 255, 0.5),
    inset 0 4px 4px rgba(255, 255, 255, 0.2),
    inset 0 -4px 4px rgba(255, 255, 255, 0.2);
}
#toggle.active2 .indicator{
    left: 70px;
    box-shadow: inset 0 8px 40px rgba(255, 255, 255, 0.7),
    inset 0 4px 4px rgba(255, 255, 255, 0.4),
    inset 0 -4px 4px rgba(255, 255, 255, 0.4);
}
</style>
