<template>
  <div class="header">
    <div class="button-container">
      <router-link to="/home/votes">
      <button-circle icon="star"></button-circle>
      </router-link>
      <!-- <router-link to="/home/vote/2">
      <button-circle icon="comment"></button-circle>
      </router-link> -->
      <router-link to="/home/createvote">
      <button-circle icon="plus" ></button-circle>
      </router-link>
      <router-link to="/home/my">
      <button-circle icon="user-circle"></button-circle>
      </router-link>
      <button-circle icon="ellipsis-h">
        <ul-arrow appear="bottom">
          <li @click="logout">log out</li>
        </ul-arrow>
      </button-circle>
    </div>
  </div>
</template>

<script>
import ButtonCircle from "./button.vue";
import UlArrow from "./ul.vue";
export default {
  name: "index-header",
  props: {},
  components: {
    ButtonCircle,
    UlArrow
  },
  methods:{
    logout(){
      var date=new Date()
      date.setSeconds(date.getSeconds()-1)
      console.log(document.cookie)
      document.cookie = "userId='';expires=" + date.toGMTString();
      this.$router.push('/')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/css/font-awesome.min.css";

.header {
  position: fixed;
  height: 65px;
  width: 100%;
  top:0;
  background-color: #e2e9ee;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  border: 0;
  border-bottom: 1px solid transparent;
  border-color:rgba(255,255,255,.3);
  border-style: outset;
  z-index: 15;
  .button-container {
    display: flex;
    width: auto;
  }
}
</style>
