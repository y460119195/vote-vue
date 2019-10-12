<template>
  <div class="vote-piece">
    <div class="vote-content">
      <p class="vote-class" :class="'class-'+randomClass()"></p>
      <p class="vote-title">{{ voteInfo.title }}</p>
      <div class="vote-line"></div>
      <div class="vote-voter">
        <div class="vote-voter-avatarList">
          <div
            class="vote-voter-avatar"
            v-for="avatar in voteInfo.voters"
            :key="avatar.index"
          >
            <span class="">
              <img :src="imgBaseUrl+(avatar.avatarImg?avatar.avatarImg:'default2.png')" alt srcset>
            </span>
          </div>
        </div>
        <div class="vote-voter-num">
          <span>{{ voteInfo.voterCount }}</span>
          voter{{ voteInfo.voterCount>1?'s':'' }}
        </div>
      </div>
    </div>
    <div class="vote-modal" @click="vRoute('vote',voteInfo.voteId)">
       <button class="vote vote-button" @click.stop="vRoute('user',voteInfo.userId)" >BY {{ voteInfo.userName }}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "VoteCard",
  props: {
    voteInfo: {
      type: Object,
      default: {}
    }
  },
  methods:{
    randomClass(){
      var list = ['a','b','c','d','e']
      return list[Math.floor(Math.random()*5)]
    },
    vRoute(route,voteId){
      this.$router.push('/home/'+route+'/'+ voteId)
    }
  },
  computed:{
    imgBaseUrl(){
      return this.$store.state.imgBaseUrl
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/font-awesome.min.css";
.vote-piece {
  position: relative;
  width: 250px;
  height: auto;
  min-height: 200px;
  background-color: #fff;
  margin: 5px;
  border-radius: 10px;
  overflow: hidden;
  &:hover .vote-modal {
    display: block;
  }
  .vote-content {
    p {
      display: block;
      text-align: left;
      white-space: pre-wrap;
    }
    .vote-class {
      width: 100%;
      height: 70px;
      background-color: #ccc;
      &.class-a {
        background-color: red;
      }
      &.class-b {
        background-color: green;
      }
      &.class-c {
        background-color: pink;
      }
      &.class-d {
        background-color: sandybrown;
      }
      &.class-e {
        background-color: skyblue;
      }
    }
    .vote-line {
      width: auto;
      height: 2px;
      margin: 5px 20px;
      background-color: rgba(200, 200, 200, 0.3);
      border-radius: 20px;
    }
    .vote-title {
      padding: 10px 20px;
      margin: 15px 0px;
      font-size: 28px;
      width: 100%;
      line-height: 40px;
    }
    .vote-voter {
      padding: 0px 20px;
      height: 36px;
      margin: 20px 0;
      font-size: 10px;
      text-align: right;
      display: flex;
      .vote-voter-avatarList {
        height: 38px;
        width: 160px;
        display: flex;
        .vote-voter-avatar {
          height: 38px;
          width: 38px;
          &:nth-of-type(2),
          &:nth-of-type(3),
          &:nth-of-type(4),
          &:nth-of-type(5) {
            margin-left: -12px;
          }
          span {
            position: relative;
            height: 36px;
            width: 36px;
            display: block;
            border-radius: 18px;
            border: 1px solid #fff;
            background-color: #fff;
            line-height: 36px;
            font-size: 34px;
            color: #666;
            box-sizing: content-box;
            /* background-image: url(https://assets.leetcode.com/static_assets/public/webpack_bundles/images/LeetCode_nav.4d940ca72.png);
          background-repeat: no-repeat;
          background-size: cover; */
            z-index: 1;
            &::before {
              position: absolute;
              left: 0px;
              top: 0px;
              height: 34px;
              width: 34px;
              z-index: 1;
            }
            img {
              position: relative;
              height: 36px;
              width: 36px;
              background-color: #eee;
              z-index: 4;
              border-radius: 18px;
            }
          }
        }
      }
      .vote-voter-num {
        height: 38px;
        font-size: 12px;
        width: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          margin-top: 3px;
          display: block;
          font-size: 16px;
          font-weight: 800;
        }
      }
    }
  }
  .vote-modal {
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(125, 125, 125, 0.2);
    width: 100%;
    height: 100%;
    line-height: 100%;
    display: none;
    cursor: pointer;
    z-index: 8;
    .vote-button {
      width: auto;
      font-weight: 700;
      padding: 0 10px;
      position: absolute;
      top: 15px;
      right: 10px;
      border-radius: 20px;
      display: block;
      margin: 0 auto;
      user-select: none;
      z-index: 6;
      background-color: rgba(255, 255, 255, 0.8);
      &:hover {
        background-color: #fff;
      }
      &:focus {
        background-color: #ddd;
      }
    }
  }
}
</style>

