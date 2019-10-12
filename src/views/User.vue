<template>
  <div class="userInfo-container">
    <!-- <div class="userInfo-button-container">
      <div class="userInfo-button">
        <button-circle icon="pencil"></button-circle>
        <button-circle></button-circle>
        <button-circle></button-circle>
      </div>
    </div>-->
    <div class="userInfo">
      <div class="userInfo-name">
        <span class="name">{{ userMainInfo.userName}}</span>
        <span>'s Index</span>
      </div>
      <div class="userInfo-avatar">
        <button class="avater-container">
          <img :src="this.$store.state.imgBaseUrl+userMainInfo.avatarImg" alt srcset>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCircle from "../components/button.vue";
import api from "../api.js";

export default {
  name: "userInfo",
  components: {
    ButtonCircle
  },
  data() {
    return {
      userMainInfo: {
        userName: "",
        avatarImg: ""
      }
    };
  },
  mounted() {
      api
      .post("/userInfo", { searchId: this.$route.params.id })
      .then(response => {
        this.userMainInfo = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    avaterUpload(e) {
      var it = e.target;
      if (!it.size) return;
      if (it.size > 2 * 1024 * 1024) alert(" too big ");
      else {
        let formData = new FormData();
        formData.append("avatar", it.files[0]);
        api
          .post("/avatarUpload", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true
          })
          .then();
      }
      it.value = null;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/reset.css";
.home{
  background-color:transparent !important;
}
.userInfo-container {
  position: relative;
  width: 100%;
  height: 100%;
  .userInfo {
    position: relative;
    width: 70%;
    margin: 0 auto;
    margin-top: 65px;
    display: flex;
    padding: 0 10px;
    .userInfo-name {
      flex-basis: 75%;
      font-size: 40px;
      font-weight: bold;
      text-align: left;
      margin: auto;
      .name {
        margin-right: 40px;
        font-size: 80px;
        display: inline-block;
      }
    }
    .userInfo-avatar {
      flex-basis: 25%;
      input {
        display: none;
      }
      .avater-container {
        height: 150px;
        outline: none;
        width: 150px;
        background-color: rgba(234,234,234,.5);
        border: 2px solid transparent;
        border-radius: 75px;
        overflow: hidden;
        padding: 2px;
        margin: 0 auto;
        img {
          height: 142px;
          width: 142px;
          border-radius: 75px;
        }
        &:focus {
          outline: none;
          border-color: rgb(102, 102, 226);
        }
      }
    }
  }
}
</style>

