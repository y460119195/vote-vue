<template>
<div class="voteList-container">
  <div class="voteList">
    <vote-card v-for="voteInfo in voteInfoList" :key="voteInfo.index" :voteInfo="voteInfo"></vote-card>
  </div>
</div>
</template>

<script>
import VoteCard from "../components/vote-card.vue";
import api from "../api.js"
export default {
  name: "voteList",
  components: {
    VoteCard
  },
  data(){
    return {}
  },
  mounted(){
    api
    .get('/voteList')
    .then(response=>{
      console.log(response)
      this.$store.state.voteInfoList = response.data
    })
  },
  computed:{
    voteInfoList(){
      return this.$store.state.voteInfoList
    },
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/reset.css";
.voteList-container{
  height: 100%;
  overflow-y: auto;
  min-width: 790px;
}
.voteList {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-width: 790px;
  padding: 5px;
  padding-top: 64px;
  height: auto;
  
}
</style>


