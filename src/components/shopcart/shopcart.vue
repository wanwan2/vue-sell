<template>
  <div class="shopcart">
    <div class="content">
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
  </div>
</template>
<script type="text/ecmascript-6">
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
    }
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
}
</style>
