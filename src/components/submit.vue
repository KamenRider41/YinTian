<!--
 * @Author: 41
 * @Date: 2021-11-18 15:50:55
 * @LastEditors: 41
 * @LastEditTime: 2021-11-18 16:40:23
 * @Description:
-->
<template>
    <div class="submitbox">
        <button class="noselect" @click="changeSubmit">
            <span>Play/Pause</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" viewBox="0 0 24 24">
                <path
                    d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861
                    5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z"/>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    changeSubmit () {

    }
  }
}
</script>

<style scoped>
.submitbox{
    height: 100px;
    width: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #222; */
}
/* .select{
    width: 100px;
    height: 50px;
    background: none;
    border: 2px solid #8b918b;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 500ms;
    outline: none;
    border: 2px solid transparent;
    width: 50px;
    transform: rotate(1080deg);
    border: 2px solid #89db84;
}
.select svg{
    fill:#89db84
}
.select span{
    color:transparent
} */
.noselect{
    width: 100px;
    height: 50px;
    background: none;
    border: 2px solid #5e635e;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 500ms;
}

span,svg{
    position: absolute;
    color: #5e635e;
    fill:transparent
}
.noselect:hover{
    font-size: 14px;
}
.noselect:focus{
    outline: none;
    border: 2px solid transparent;
    width: 50px;
    border-left: 2px solid #5e635e;
    border-bottom: 2px solid #5e635e;
    animation: spin 2s 500ms forwards;
}
.noselect:focus span{
    color:transparent
}
.noselect:focus svg{
    animation: check 500ms 2300ms forwards;
}

@keyframes spin{
    80%{
        border: 2px solid transparent;
    }
    100%{
        transform: rotate(1080deg);
        border: 2px solid #5e635e;
    }
}

@keyframes check{
    to{
        fill:#5e635e
    }
}
@keyframes circle{
    to{
        border:2px solid #5e635e
    }
}
</style>
