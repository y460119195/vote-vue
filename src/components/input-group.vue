<template>
  <div class="input-group" :class="{'is-focus':isFocus}">
    <span class="input-icon">
      <i :class="'fa fa-'+icon"></i>
    </span>
    <input :type="type" :value="value" @input="$emit('input', $event.target.value)" @focus="isFocus = !isFocus" @blur="isFocus = !isFocus">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "InputGroup",
  props: {
    icon: {
      type: String,
      default: "user-circle-o"
    },
    type:{
      type:String,
      default:'text',
    },
    name:{
      type:String,
      default:'',
    },
    value:{
      type:String,
      default:'',
    },
  },
  data() {
    return {
      isFocus: false
    };
  }
};
</script>

<style lang="scss">
@import "../assets/css/font-awesome.min.css";

/* input-group */
.input-group {
  display: table;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 3px;
  width: 350px;
  height: 50px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  &.is-focus {
    border-color: #007bfc !important;
  }
  .input-icon {
    display: table-cell;
    padding: 8px 10px 8px 20px;
    font-size: 24px;
    line-height: 32px;
    color: #333;
    width: 1%;
    white-space: nowrap;
    vertical-align: middle;
  }
  input {
    font: 12px/1.14 Microsoft YaHei, arial, \5b8b\4f53;
    color: #333;
    outline: 0;
    display: table-cell;
    position: relative;
    display: inline;
    width: 100%;
    height: 48px;
    font-size: 20px;
    padding: 0 15px;
    border: 0;
    box-sizing: border-box;
    transition: all 5000s ease-in-out 0s;
    transition-property: background-color, color;
  }
}
</style>


