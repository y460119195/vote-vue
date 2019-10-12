<template>
  <div class="main-vote">
    <index-header></index-header>
    <div class="home-container">
      <div class="home">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import IndexHeader from '../components/header.vue'

export default {
  name:"home",
  components:{
    IndexHeader,
  }
}
</script>


<style lang="scss">
.main-vote{
  height: 100%;
}
.home-container{
  position: relative;
  width: 100%;
  background-color: #fff;
  background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('https://wallpapershome.com/images/pages/pic_h/6500.jpeg') no-repeat 0% 20%/ cover;
  //background:linear-gradient(rgba(58, 84, 141, 0.2), rgba(131, 150, 125, 0.6));
  // background-image: url('https://wallpapershome.com/images/pages/pic_h/6500.jpeg');
  height: 100%;
  padding-top: 65px;
  .home{
    width: 70%;
    margin: 0 auto;
    height: 100%;
    //background-color: rgba(255,255,255,.4);
  }
}
</style>