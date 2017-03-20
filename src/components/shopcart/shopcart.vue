<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper inline-block">
          <div class="logo" :class="{'heightlight':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'heightlight':totalCount>0}"></span>
          </div>
          <div class="num text-center" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price inline-block blod" :class="{'heightlight':totalPrice>0}">￥{{totalPrice}}元</div>
        <div class="desc inline-block">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right text-center">
        <div class="pay blod" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls" v-show="ball.show" transition="drop" class="ball">
        <div class="inner inner-hook"></div>
      </div>
    </div>
    <div class="shopcart-list" v-show="listShow" transition="fold">
      <div class="list-header clearfix">
        <div class="title fl">购物车</div>
        <span class="empty fr">清空</span>
      </div>
      <div class="list-content">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span class="blod">￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import cartcontrol from 'components/cartcontrol/cartcontrol'
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [{
          price: 0,
          count: 0
        }]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [{
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }],
      dropBalls: [],
      fold: true
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      return show
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    }
  },
  transitions: {
    drop: {
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = -rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webKitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0})`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webKitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webKitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0})'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webKitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    }
  },
  components: {
    cartcontrol
  }
}
</script>
<style lang="less" style="text/less">
@import (reference) "../../static/css/index.less";
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  z-index: 20;
  .content {
    display: flex;
    height: 100%;
    background: #141d27;
    .content-left {
      flex: 1;
      font-size: 0;
      .logo-wrapper {
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        vertical-align: top;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #2b343c;
          text-align: center;
          &.heightlight {
            background: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            font-size: 24px;
            line-height: 44px;
            color: #80858a;
            &.heightlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          border-radius: 16px;
          font-size: 9px;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
        }
      }
      .price,
      .desc {
        vertical-align: top;
        line-height: 24px;
      }
      .price {
        margin-top: 12px;
        box-sizing: border-box;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, .1);
        font-size: 16px;
        color: rgba(255, 255, 255, .4);
        &.heightlight {
          color: #fff;
        }
      }
      .desc {
        margin: 12px 0 0 12px;
        font-size: 10px;
        color: rgba(255, 255, 255, .4);
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        font-size: 12px;
        &.not-enough {
          background: #2b333b;
          color: rgba(255, 255, 255, .4);
        }
        &.enough {
          background: #00b43c;
          color: rgb(255, 255, 255);
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 30;
      &.drop-transition {
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, .41);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
  }
  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    &.fold-transition {
      transition: all .5s;
      transform: translate3d(0, -100%, 0);
      &.fold-enter,
      &.fold-leave {
        transform: translate3d(0, 0, 0);
      }
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      .border-1px(rgb(7, 17, 27));
      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .empty {
        font-size: 12px;
        color: rgb(0, 160, 200);
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;
      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        .border-1px(rgba(7, 17, 27, .1));
        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .price {
          position: absolute;
          right: 96px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          color: rgb(240, 20, 20)
        }
      }
      .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: 6px;
      }
    }
  }
}
</style>
