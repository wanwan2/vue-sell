<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item table">
          <span class="text table-cell">
    			<span v-show="item.type>0" class="icon inline-block" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food=item">
              <div class="icon"><img :src="food.icon"></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: []
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
      }
    })
  }
}
</script>
<style lang="less" style="text/less">
@import (reference) "../../static/css/index.less";
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    height: 100%;
    background-color: #f3f5f7;
    .menu-item {
      width: 56px;
      height: 54px;
      padding: 0 12px;
      line-height: 14px;
      .icon {
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        &.decrease {
          .bg-images('../../components/goods/decrease_3');
        }
        &.discount {
          .bg-images('../../components/goods/discount_3');
        }
        &.guarantee {
          .bg-images('../../components/goods/guarantee_3');
        }
        &.invoice {
          .bg-images('../../components/goods/invoice_3');
        }
        &.special {
          .bg-images('../../components/goods/special_3');
        }
      }
      .text {
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        .border-1px(rgba(7, 17, 27, .1));
      }
    }
  }
  .foods-wrapper {
    flex: 1;
  }
}
</style>
