<template>
  <ul class="ul-arrow" :style="ulClass">
    <slot></slot>
    <div class="arrow">
      <svg width="24" height="24">
        <path d="M0 24 L12 12 L24 24"></path>
      </svg>
    </div>
  </ul>
</template>

<script>
export default {
  name: "ul-arrow",
  props: {
    arrow: {
      type: String,
      default: "top right"
    },
    appear: {
      type: String,
      default: "bottom"
    },
    appearPx: {
      type: Number,
      default: 50
    },
    appearPos:{
      type:Object,
      default(){
        return {top:50,}
      }
    }
  },
  computed:{
    direction:function(){
      switch (this.appear) {
        case "bottom":
          return "top:";
        case "left":
          return "right:";
        case "right":
          return "left:";
        case "top":
          return "bottom:";
        default:
          return "top:";
      }
    },
    ulClass:function(){
      return this.direction + this.appearPx + "px";
    }
  },
  watch: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ul-arrow {
  position: absolute;
  top: 50px;
  height: auto;
  width: auto;
  background-color: #fff;
  right: -15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
  border-radius: 5px;
  display: none;
  li {
    white-space: nowrap;
    padding: 5px 30px;
    font-size: 18px;
    height: 40px;
    color: #333;
    border-top: 1px solid rgba(200, 200, 200, 0.3);
  }
  li:nth-of-type(1) {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  li:nth-last-of-type(1) {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  li:hover {
    color: rgb(79, 71, 192);
    background-color: #efefef;
  }
  .arrow {
    stroke: rgb(239, 239, 239);
    fill: #fff;
    position: absolute;
    top: -24px;
    right: 15px;
    height: 24px;
    width: 24px;
  }
}
</style>
