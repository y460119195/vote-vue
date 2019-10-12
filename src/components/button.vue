<template>
  <div class="button-circle">
    <button class="inside" :class="'fa fa-'+icon" @click="targetBlur">
      <slot></slot>
    </button>
    <button class="outside" @click="targetBlur"></button>
  </div>
</template>

<script>
export default {
  name: "button-circle",
  props: {
    icon: {
      type: String,
      default: "circle-thin"
    },
    // blur: {
    //   type: Boolean,
    //   default: false
    // }
  },
  methods: {
    targetBlur(e) {
      var el = e.target;
      if (el.matches(".outside")) {
        el = el.previousElementSibling;
        el.focus();
      }
      if (!el.querySelector("ul")) {
        el.blur();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/css/reset.css";
button {
  width: 100%;
  height: 40px;
  display: block;
  outline: none;
  border: 0;
  background-color: #999;
  color: #333;
  border-radius: 3px;
}
.button-circle {
  position: relative;
  height: 64px;
  width: 64px;
  .outside {
    position: absolute;
    height: 54px;
    width: 54px;
    top: 5px;
    left: 5px;
    background-color: transparent;
    border-radius: 27px;
    cursor: pointer;
    &:focus {
      border: 2px solid #9bc1fb;
      background-color: rgba(220, 220, 220, 0.5);
    }
    &:hover {
      background-color: rgba(220, 220, 220, 0.5);
    }
  }
  .inside {
    position: absolute;
    height: 26px;
    width: 26px;
    top: 19px;
    left: 19px;
    background-color: transparent;
    border-radius: 13px;
    z-index: 3;
    font-size: 26px;
    color: #666;
    text-align: center;
    line-height: 26px;
    padding: 0;
    &:focus + .outside {
      border: 2px solid #9bc1fb;
      background-color: rgba(220, 220, 220, 0.5);
    }
    &:hover + .outside {
      background-color: rgba(220, 220, 220, 0.5);
    }
    &:focus ul {
      display: block;
    }
  }
}
</style>
