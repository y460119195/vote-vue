<template>
  <div class="vote-container">
    <div class="textLine title">
      <div>{{ voteInfo.title }}</div>
    </div>
    <div class="textLine desc">
      <div class="tip">Describe:</div>
      <div class="space"></div>
      <div class="content">{{ voteInfo.describe }}</div>
    </div>
    <div class="textLine deadline">
      <div class="tip">Deadline:</div>
      <div class="space"></div>
      <div class="content">{{ voteInfo.deadline }}</div>
    </div>
    <div class="textSpace"></div>
      <div v-if="!hasVoted" ref="options" key="noVote" class="textLine options">
        <div
          class="option"
          v-for="(option,idx) in voteInfo.options"
          :data-option-id="option.optionId"
          :key="idx"
          @click="voting"
        >
          <h1>{{option.content }}</h1>
          <div class="modal"></div>
        </div>
      </div>
      <div v-else key="voted" class="textLine voteRst">
        <div v-for="(rst,idx) in voteRst.data" :key="idx">
          <div class="option">{{idx+' :'}}</div>
          <div class="processContain">
            <process
              class="process"
              :per="perCal(rst.length,voteRst.total)"
              :processStyle="{process:{color:'#000'}}"
            ></process>
            <div class="voteCount">{{rst.length + ' vote'+(rst.length>1?'s':'') }}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import api from "../api.js";
import process from "../components/process.vue";
//import socketIo from 'socketio'

export default {
  name: "vote",
  data() {
    return {
      voteInfo: {
        title: "",
        describe: "",
        options: ["", ""],
        deadline: new Date(Date.now() + 8640000).toISOString().slice(0, 16),
        anonymouse: "0",
        singleSelection: "1"
      },
      voteRst: {},
      hasVoted: false,
      hasDone:false,
    };
  },
  mounted() {
    api
      .post("/voteInfo", {
        voteId: this.$route.params.voteId
      })
      .then(response => {
        this.voteInfo = response.data.voteInfo;
      });
    api
      .post("/vote", {
        voteId: this.$route.params.voteId
      })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          console.log("未投");
          this.hasVoted = false;
        } else if (response.status == 211) {
          this.hasVoted = true;
          this.voteRst = this.summaryVoter(response.data);
        }
      })
      .catch(reason => {});
      
  },
  methods: {
    voting(e) {
      api
        .post("/vote", {
          voteId: this.$route.params.voteId,
          optionId: Number(
            e.target.parentElement.getAttribute("data-option-id")
          )
        })
        .then(response => {
          console.log(response);
          this.voteRst = this.summaryVoter(response.data);
          this.$refs.options.classList.add('disappear')
          setTimeout(()=>{
            this.hasVoted = true
          },500)
        });
    },
    summaryVoter(data) {
      var result = {};
      var map = {};
      this.voteInfo.options.forEach(it => {
        map[it.optionId] = it.content;
        result[it.content] = [];
      });
      for (var option of data) {
        let optionId = option.optionId;
        delete option.optionId;
        result[map[optionId]].push(option);
      }
      return {
        total: data.length,
        data: result
      };
    },
    perCal(a, b) {
      return Math.floor((a / b).toFixed(2) * 100);
    },
  },
  computed: {},
  components: {
    process
  }
};
</script>

<style lang="scss">
@import url(https://cdn.jsdelivr.net/npm/animate.css@3.5.1);
.option {
  cursor: pointer;
}
.vote-container {
  background-color: transparent;
  padding: 20px;
  .textSpace {
    margin: 30px 0;
    height: 2px;
    background-color: #ddd;
  }
}

.textLine {
  margin: 10px 0;
  font-size: 35px;
  display: flex;
  .tip {
    flex-basis: 30%;
    text-align: right;
    flex-grow: 1;
  }
  .content {
    flex-basis: 65%;
    text-align: left;
    flex-grow: 1;
  }
  .space {
    flex-basis: 5%;
    flex-grow: 1;
  }
  &.title {
    font-size: 65px;
    font-weight: bold;
    justify-content: center;
  }
  &.desc {
    margin-top: 50px;
  }
  &.deadline {
    margin-top: 20px;
  }
  &.options {
    position: relative;
    display: flex;
    flex-direction: column;
    transition: all .5s ease;
    &.disappear{
      transform: translateX(-120%);
    }
    .option {
      position: relative;
      margin: 40px 20px;
      background-color: rgba(230, 230, 230, 0.6);
      border-radius: 40px;
      width: 60%;
      align-self: center;
      padding: 10px;
      .modal {
        display: none;
        position: absolute;
        background-color: rgba(220, 220, 220, 0.4);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 40px;
        &::after {
          content: " VOTE !";
          position: absolute;
          top: 0;
          right: -40px;
          line-height: 59px;
          font-size: 25px;
          font-weight: bold;
        }
      }
      &:hover .modal {
        display: block;
      }
    }
  }
  &.voteRst {
    position: relative;
    display: flex;
    flex-direction: column;
    transition: all .5s ease;
    margin-left: 8%;
    .option {
      text-align: left;
      margin: 20px 0;
      margin-top: 0px;
      font-weight: bold;
      padding: 0 30px;
    }
    .processContain {
      display: flex;
      margin-bottom: 40px;
      padding: 0 20px;
      .process {
        flex-basis: 70%;
        flex-grow: 3;
      }
      .voteCount {
        flex-basis: 30%;
        font-size: 20px;
        line-height: 40px;
        flex-grow: 1;
      }
    }
  }
  span {
    text-align: left;
  }
}
</style>


