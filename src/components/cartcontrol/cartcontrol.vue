<template>
  <div class="cartcontrol">
    <div class="cart-decrease inline-block" v-show="food.count > 0" @click="decreaseCart" transition="move">
      <span class="inner inline-block icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count inline-block" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add inline-block icon-add_circle" @click="addCart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>
<style lang="less" style="text/less">
@import (reference) "../../static/css/index.less";
.cartcontrol {
  font-size: 0;
  .cart-decrease,
  .cart-add,
  .cart-count {
    padding: 6px;
  }
  .cart-count,
  .cart-add {
    line-height: 24px;
  }
  .cart-count {
    width: 12px;
    font-size: 10px;
    vertical-align: top;
    text-align: center;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
  .cart-decrease {
    transition: all .4s linear;
    .inner {
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
    }
    &.move-transition {
      opacity: 1;
      transform: translate3D(0, 0, 0);
      .inner {
        transition: all .4s linear;
        transform: rotate(0);
      }
    }
    &.move-enter,
    &.move-leave {
      opacity: 0;
      transform: translate3D(24px, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
