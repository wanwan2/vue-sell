<template>
  <div class="food" v-show="showFlag" transition="move" v-el:food>
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image" alt="">
        <div class="back" @click="hide">
          <span class="icon-arrow_lift"></span>
        </div>
      </div>
      <div class="content">
        <h1 class="title bold">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <price :food="food"></price>
        <div class="cartcontrol-wrapper" v-show="food.count>0">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy" v-show="!food.count || food.count===0" transition="fade" @click.stop.prevent="addFirst">加入购物车</div>
      </div>
      <split></split>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import BScroll from 'better-scroll'
import price from 'components/price/price'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import split from 'components/split/split'
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$els.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFirst(event) {
      if (!event._constructed) {
        return
      }
      console.log(event.target)
      this.$dispatch('cart.add', event.target)
      Vue.set(this.food, 'count', 1)
    }
  },
  components: {
    price,
    cartcontrol,
    split
  }
}
</script>
<style lang="less" style="text/less">
@import (reference) "../../static/css/index.less";
.food {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  width: 100%;
  z-index: 15;
  background: #fff;
  &.move-transition {
    transition: all .2s linear;
    transform: translate3d(0, 0, 0);
  }
  &.move-enter,
  &.move-leave {
    transform: translate3d(100%, 0, 0);
  }
  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 10px;
      left: 0;
      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: rgb(147, 153, 159);
      }
    }
  }
  .content {
    padding: 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .detail {
      margin-bottom: 18px;
      line-height: 10px;
      height: 10px;
      font-size: 0;
      .sell-count,
      .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .sell-count {
        margin-right: 12px;
      }
    }
  }
  .cartcontrol-wrapper {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
  .buy {
    position: absolute;
    box-sizing: border-box;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    padding: 0 12px;
    height: 24px;
    line-height: 24px;
    border-radius: 12px;
    font-size: 10px;
    color: #fff;
    background: rgb(0, 160, 220);
    &.fade-transition {
      transition: all .2s;
      opacity: 1;
    }
    &.fade-enter,
    &.fade-leave {
      opacity: 0;
    }
  }
}
</style>
