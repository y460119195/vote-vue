<template>
  <div>
    <div class="userInfo-button-container">
      <div class="userInfo-button">
        <button-circle icon="pencil"></button-circle>
        <button-circle></button-circle>
        <button-circle></button-circle>
      </div>
    </div>
    <div class="userInfo-container">
      <div class="userInfo">
        <div class="userInfo-name">
          <span class="name">{{ userMainInfo.userName}}</span>
          <span>'s Index</span>
        </div>
        <div class="userInfo-avatar">
          <button class="avater-container" @click="$refs.imgChooser.click()">
            <img :src="(this.$store.state.imgBaseUrl+(userMainInfo.avatarImg||'default2.png'))" alt srcset>
          </button>
          <input
            :ref="'imgChooser'"
            @change="avaterUpload"
            type="file"
            name="avter"
            id
            accept="image/*"
          >
        </div>
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
      .get("/userInfo")
      .then(response => {
        this.userMainInfo = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    window.scrollTo(0, 0);
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
          .then(response => {
            if (response.status == 200) {
              api.get('/avatarUpload')
              .then(response=>{
                this.userMainInfo.avatarImg = response.data.avatarImg
              })
            }
          })
          .then(response => {
            if (response.status == 303) {
              this.$router.push("/");
            }
          });
      }
      it.value = null;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/reset.css";
.userInfo-button-container {
  top: 64px;
  height: 64px;
  width: 70%;
  position: fixed;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.3);
  .userInfo-button {
    margin: 0 auto;
    width: 90%;
    display: flex;
  }
  &::after {
    content: "";
    height: 64px;
    position: absolute;
    //background-color: rgba(227, 233, 238, 0.4);
    background-color: rgba(255, 255, 255, 0.3);
    width: 40%;
    top: 0;
    left: -40%;
  }
  &::before {
    content: "";
    height: 64px;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.3);
    width: 40%;
    top: 0;
    right: -40%;
  }
}
.userInfo-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 64px;
  .userInfo {
    position: relative;
    width: 70%;
    margin: 0 auto;
    display: flex;
    padding: 0 10px;
    padding-top: 65px;
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
        background-color: transparent;
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

