<!--
 * @Author: 41
 * @Date: 2021-11-17 11:27:25
 * @LastEditors: 41
 * @LastEditTime: 2021-11-17 11:55:57
 * @Description:
-->
<template>
    <div class="app">
        <span class="red">Give</span>
        <span class="green">Me</span>
        <span class="blue">Offer</span>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.app{
    width: 500px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:rgb(48, 47, 47);
    font-size: 20px;
}
span{
    width: 100px;
    height: 100px;
    margin: 30px;
    border-radius: 100%;
    border:5px solid #fff;
    padding-top: 27px;
    padding-left: 1px;
    box-sizing: border-box;
}
.red{
    animation: just1 4s ease-in-out infinite alternate;
}
.green{
    animation: just2 3s ease-in-out infinite alternate;
}
.blue{
    animation: just3 2s ease-in-out infinite alternate;
}
@keyframes just1{
    0%{
        border:5px solid rgba(255,0,0,0);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0),
                    0 0 0 rgba(0,0,0,0) inset;
        color:null;
    }
    100%{
        border:5px solid rgba(255,0,0,1);
        box-shadow: 0 0 100px rgba(255, 0, 0, 1),
                    0 0 35px rgba(255,0,0,1) inset;
        color:rgb(68, 67, 67);
    }
}
@keyframes just2{
    0%{
        border:5px solid rgba(0,255,0,0);
        box-shadow: 0 0 0 rgba(0, 255, 0, 0),
                    0 0 0 rgba(0,255,0,0) inset;
    }
    100%{
        border:5px solid rgba(0,255,0,1);
        box-shadow: 0 0 100px rgba(0, 255, 0, 1),
                    0 0 35px rgba(0,255,0,1) inset;
        color:rgb(60, 60, 60);
    }
}
@keyframes just3{
    0%{
        border:5px solid rgba(0,0,255,0);
        box-shadow: 0 0 0 rgba(0, 0, 255, 0),
                    0 0 0 rgba(0,0,255,0) inset;
    }
    100%{
        border:5px solid rgba(0,0,255,1);
        box-shadow: 0 0 100px rgba(0, 0, 255, 1),
                    0 0 55px rgba(0,0,255,1) inset;
        color:rgb(48, 47, 47);
    }
}
</style>
