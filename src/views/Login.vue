<template>
  <div class="body" :class="{'registerBgc':isClicked}">
    <div class="main-container">
      <div class="main">
        <div class="main-content">
          <div class="login-container" :class="{'rotate':isClicked}">
            <div class="login">
              <form>
                <p class="form-title">Welcome !</p>
                <input-group type="text" v-model="loginInfo.userName" icon="user-circle-o"></input-group>
                <input-group type="password" v-model="loginInfo.password" icon="key"></input-group>                
                  <input-group class="captcha" type="text" v-model="loginInfo.captcha" icon="check-square-o">
                  <img ref="captcha" src="/captcha" @click="refreshCaptcha" alt="" srcset="">
                  </input-group>
                  <div class="rail-space-between">
                  <div class="rail-space"></div>
                  <div class="rail-content">
                    <a href class="forgetPwd">Forgot password?</a>
                  </div>
                </div>
                <button @click.prevent="login" class="btnLogin">Log in</button>
              </form>
            </div>
            <div class="login register">
              <form action>
                <p class="form-title">Sign up</p>
                <input-group type="text" icon="user-circle-o" v-model="signUpInfo.userName"></input-group>
                <input-group type="password" icon="key" v-model="signUpInfo.password"></input-group>
                <input-group type="email" icon="envelope-o" v-model="signUpInfo.email"></input-group>
                <button @click.prevent="signUp" class="btnRegister">Sign up</button>
              </form>
            </div>
          </div>
        </div>
        <div class="main-space"></div>
        <div class="main-tip">
          <span class="main-word" :class="{'changeText':isClicked}"></span>
          <button
            class="change"
            @click="isClicked = !isClicked"
            :class="{'changeText':isClicked}"
            before="Go Sign up !"
            after="Go Log in !"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/input-group.vue";
import api from "../api.js";

export default {
  name: "login",
  components: {
    InputGroup
  },
  mounted() {
    api.get("/login").then(response => {
      console.log(response)
      if (response.status == 200) {
        console.log(response)
        this.$router.push("/home");
      }
    });
    //var captcha = svgCaptcha.create();
  },
  data() {
    return {
      isClicked: false,
      loginInfo: {
        userName: "",
        password: "",
        captcha: ""
      },
      signUpInfo: {
        userName: "",
        password: "",
        email: ""
      },
      captcha:{
        data:"",
        text:""
      }
    };
  },
  methods: {
    login() {
      if(!this.loginInfo.userName){
        alert('userName can not be null')
        return 0
      }
      if(!this.loginInfo.password){
        alert('password can not be null')
        return 0
      }
      if(!this.loginInfo.captcha){
        alert('cpatcha can not be null')
        return 0
      }
      api.post("/login", this.loginInfo).then(response => {
        if (response.status == 200) {
          this.$router.push("/home");
        }else{
          alert(response.data.msg);
          this.refreshCaptcha()
        }
      });
    },
    signUp() {
      if(!this.signUpInfo.userName){
        alert('userName can not be null')
        return 0
      }
      if(!this.signUpInfo.password){
        alert('password can not be null')
        return 0
      }
      if(!this.signUpInfo.email){
        alert('email can not be null')
        return 0
      }
      api.post("/signUp", this.signUpInfo).then(response => {
        if (response.status == 200) {
          alert("success");
          this.$router.go("/home");
        } else if (response.status == 201) {
          alert("duplicate username");
          signUpInfo.userName = "";
        }else{
          alert(response.data.msg);
        }
      });
    },
    refreshCaptcha(e){
      this.$refs.captcha.src = '/captcha?v='+Math.random().toString().slice(2,6)
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/reset.css";
/* error tip */
.errTip {
  border-color: red !important;
}
.errTip::before {
  content: "";
  position: absolute;
}

.input-group {
  margin-top: 25px;
}
/* login-css */
.body {
  width: 100%;
  height: 100%;
  background-color: #163d6f;
  background-image: url(https://wallpapershome.com/images/pages/pic_h/17753.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.5s;
}
.body.registerBgc {
  background-color: #aaabbb;
  background-image: url(https://wallpapershome.com/images/pages/pic_h/16016.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.form-title {
  margin: 0;
  color: #333;
  font-size: 40px;
  font-weight: 500;
  text-align: center;
  padding: 15px;
}

.login-container {
  background-color: rgba(255, 255, 255, 0.4);
  position: relative;
  height: 520px;
  width: 430px;
  padding: 25px 40px;
  transition: all 0.6s ease-in-out;
  transform-style: preserve-3d;
  border-radius: 3px;
  box-shadow: 1px;


.login {
  position: absolute;
  background-color: transparent;
  backface-visibility: hidden;
  transform: rotateY(0) translateZ(1px);
}

.register {
  position: absolute;
  background-color: transparent;
  transform: rotateY(180deg) translateZ(1px);
}

.login-container.rotate {
  transform: rotate3d(0, 1, 0, 180deg);
}

/* login-container中所有button */
.login-container button {
  height: 40px;
  margin: 25px 0;
}

/* 左侧有空格的行元素 */
.rail-space-between {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
}

.rail-space-between .rail-space {
  display: flex;
  flex-grow: 1;
}

.rail-space-between .rail-content {
  display: flex;
  flex-grow: 0;
  height: 40px;
  align-items: center;
  white-space: nowrap;
}
.main-container {
  height: calc(100% - 20px);
  display: flex;
  align-items: center;
  overflow: scroll;
}

.main {
  width: 100%;
  display: flex;
}

.main-content {
  display: flex;
  flex-grow: 2;
  justify-content: flex-end;
}

.main-space {
  flex-grow: 1;
}

.main-tip {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  padding: 0 10px;
  justify-content: center;
}

.main-tip button {
  position: relative;
  height: 60px;
  width: 230px;
  color: #ddd;
  font-size: 25px;
  border-radius: 30px;
  background-color: rgba(200, 200, 200, 0.6);
  margin: 40px 25px;
}

.main-tip button::before {
  content: attr(before);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  line-height: 60px;
  transition: all 0.2s;
  transition-delay: 0.2s;
  opacity: 1;
}

.main-tip button.changeText::before {
  transition-delay: 0s;
  opacity: 0;
}

.main-tip button::after {
  content: attr(after);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  line-height: 60px;
  transition: all 0.2s;
  opacity: 0;
}

.main-tip button.changeText::after {
  color: #333;
  transition-delay: 0.2s;
  opacity: 1;
}

.main-tip button:hover {
  background-color: #007bfc;
}

.main-word {
  position: relative;
  display: block;
  width: 100%;
  font-weight: 600;
  font-size: 40px;
  color: #ddd;
  height: 120px;
}
.main-word::before {
  content: "Do Not \A Have a Account ?";
  position: absolute;
  text-align: left;
  color: #ddd;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  line-height: 70px;
  transition: all 0.2s;
  transition-delay: 0.2s;
  opacity: 1;
  white-space: pre;
}

.main-word.changeText::before {
  transition-delay: 0s;
  opacity: 0;
}

.main-word::after {
  content: "Had A" "\A""Accout Yet ?";
  text-align: left;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  line-height: 70px;
  transition: all 0.2s;
  opacity: 0;
  white-space: pre;
}

.main-word.changeText::after {
  transition-delay: 0.2s;
  color: #333;
  opacity: 1;
}

.forgetPwd {
  font-size: 15px;
  font-weight: 500;
}

.login .btnLogin {
  width: 180px;
  height: 50px;
  font-size: 18px;
  font-weight: 500;
  margin: 25px auto;
  color: #fff;
  margin-top: 30px;
  border-radius: 10px;
  font-size: 20px;
 
}

.register .btnRegister {
  width: 180px;
  height: 50px;
  font-size: 18px;
  font-weight: 500;
  margin: 25px auto;
  color: #fff;
  margin-top: 30px;
  border-radius: 10px;
  margin-top: 70px;
}
.captcha{
  display: flex;
  input{
    padding-left: 40px;
  }
  img{
    height: 48px;
  }
}
.login-container .input-group {
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid transparent;
}

.login-container .input-group input {
  background-color: transparent;
}
}
</style>

