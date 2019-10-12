<template>
  <div class="process-container" :style="processStyle.processContain||{}">
    <div class="process" :style="[processStyle.process||{},{width:this.per+'%'}]">
      <div v-if="showPer" class="perNum" :style="[processStyle.processNum||{}]"><span>{{ per+" %" }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "process",
  props: {
    per: {
      type: Number, //0-100
      default: 0
    },
    showPer: {
      type: Boolean,
      default: true
    },
    processStyle: {
      type: Object,
      default() {
        return {
          processContain: {
            height: "40px",
            width: "200px",
            backgroundColor: "#eee"
          },
          process: {
            backgroundColor: "#000"
          },
          processNum:{
            color:'#fff'
          }
        };
      }
    }
  },
  computed: {
    resize() {
      return;
    }
  }
};
</script>

<style lang="scss">
.process-container {
  height: 40px;
  width: 200px;
  background-color: #eee;
  border-radius: 30px;
  overflow: hidden;
  .process{
    position: relative;
  height: 100%;
  background-color: #000;
  transition: all 1s ease;
  transition-delay: .2s;
  border-radius: 50px;
  .perNum{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 40px;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    color:#fff;
    display:flex;
    align-items: center;
    span{
      margin: auto;
    }
  }
}
  
}

</style>

