<template>
  <form class="input-form">
    <div class="input-line">
      <span>Title:</span>
      <div class="input-space"></div>
      <div class="input-value">
        <input type="text" v-model="voteInfo.title">
      </div>
    </div>
    <div class="input-line">
      <span>Describe:</span>
      <div class="input-space"></div>
      <div class="input-value">
        <input type="text" v-model="voteInfo.describe">
      </div>
    </div>

    <div class="input-line">
      <span>Options:</span>
      <div class="input-space"></div>
      <div class="input-value">
        <div v-for="(option,idx) in voteInfo.options" :key="idx" class="voteOption">
          <input type="text" :placeholder="'option'+(idx+1)" v-model="voteInfo.options[idx]">
          <button v-show="idx"  class="fa  fa-minus" @click.prevent="voteInfo.options.splice(idx,1)"></button>
        </div>
        <button class="fa  fa-plus" @click.prevent="voteInfo.options.push('')"></button>
      </div>
    </div>

    <div class="input-line">
      <span>Deadline:</span>
      <div class="input-space"></div>
      <div class="input-value">
        <input type="datetime-local" v-model="voteInfo.deadline">
      </div>
    </div>

    <div class="input-line">
      <span>Signle:</span>
      <div class="input-space"></div>
      <div class="input-value">
        <select v-model="voteInfo.singleSelection">
          <option value="1">single</option>
          <option value="0">multiply</option>
        </select>
      </div>
    </div>
<div class="input-line submit">
    <button @click="submitVote">submit</button>
</div>
  </form>
</template>

<script>
//import VCalendar from 'v-calendar'
import api from "../api.js";

export default {
  name: "CreateVote",
  data() {
    return {
      voteInfo: {
        title: "",
        describe: "",
        options: ["", ""],
        deadline: new Date(Date.now() + 8640000*14).toISOString().slice(0, 16),
        anonymous: "0",
        singleSelection: "1"
      }
    };
  },
  components: {
    //VCalendar,
  },
  methods: {
    submitVote() {
      if(!this.voteInfo.title){
        alert('title can not be null')
        return 0
      }
      if(!this.voteInfo.describe){
        alert('describe can not be null')
        return 0
      }
      if(!this.voteInfo.deadline){
        alert('deadline can not be null')
        return 0
      }
      this.voteInfo.options.forEach(it=>{
        if(!it){
          alert('option can not be null')
          return 0
        }
      })
      api
        .post("/createVote", this.voteInfo)
        .then(response => {
          if (response.status == 200) {
            this.$router.push({ path: "/scuess" });
          }
        })
        .then((response)=>{
          if (response.status == 303) {
            this.$router.push({ path: "/" });
          }
        });
    }
  }
};
</script>

<style lang="scss">
.input-form {
  width: 70%;
  margin: 0 auto;
  margin-top:5%;
  padding: 20px;
  .submit{
    width: 200px;
    margin: 0 auto;
    margin-top: 40px;
    button{
      border-radius: 30px;
      background-color: #666;
      color:#fff;
      font-weight: bold;
      height: 50px;
      font-size: 20px;
    }
  }
}
.input-line {
  width: 100%;
  padding: 10px;
  display: flex;
  min-height: 50px;
  margin-bottom: 15px;
  span {
    font-size: 20px;
    flex-basis: 35%;
    text-align: right;
    flex-grow: 1;
    line-height: 35px;
  }
  .input-space {
    height: 100%;
    flex-basis: 5%;
    flex-grow: 1;
  }
  .input-value {
    flex-grow: 1;
    flex-basis: 55%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    .voteOption{
      position: relative;
      align-self:flex-start;
      display: flex;
      margin-bottom: 10px;
      button{
        position: absolute;
        width: 35px;
        height: 35px;
        border-radius: 17px;
        right: -55px;
        color:#fff;
        background-color: #666;
        font-size: 15px;
      }
    }
    button{
      background-color: #666;
      border-radius: 15px;
      width: 60px;
      color:#fff;
      font-size: 18px;
    }
  }
}
input,select {
  height: 35px;
  width: 250px;
  font-size: 15px;
  line-height: 35px;
  padding:0 15px;
}
</style>
