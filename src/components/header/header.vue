<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar inline-block"><img width="64" height="64" :src="seller.avatar"></div>
      <div class="content inline-block">
        <div class="title">
          <span class="brand inline-block"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description thin">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support-item" v-if="seller.supports">
          <span class="icon inline-block" :class="classMap[seller.supports[0].type]"></span>
          <span class="text thin">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count thin" @click="showDetail()">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail()">
      <span class="bulletin-title inline-block"></span><span class="bulletin-text  inline-block">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="bg">
      <img :src="seller.avatar" alt="background" width="100%">
    </div>
    <div class="detail" v-show="detailShow" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name bold">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <divider :info="'优惠信息'"></divider>
          <ul v-if="seller.supports" class="supports-wrapper">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon inline-block" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text thin">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <divider :info="'商家公告'"></divider>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <span class="icon-close"></span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import star from 'components/star/star'
import divider from 'components/divider/divider'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star,
    divider
  }
}
</script>
<style lang="less" style="text/less">
@import (reference) "../../static/css/index.less";
.header {
  position: relative;
  overflow: hidden;
  background-color: rgba(7, 17, 27, .5);
  color: #fff;
  font-size: 0;
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    .avatar {
      border-radius: 2px;
      overflow: hidden;
    }
    .content {
      margin-left: 16px;
      .title {
        display: inline-flex;
        align-items: center;
        margin: 2px 0 8px 0;
        font-size: 16px;
        .brand {
          margin-right: 6px;
          width: 30px;
          height: 18px;
          .bg-images('../../components/header/brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          font-size: 16px;
        }
      }
      .description {
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 12px;
      }
      .support-item {
        display: inline-flex;
        .icon {
          margin-right: 4px;
          width: 14px;
          height: 14px;
          background-size: 14px;
        }
        .text {
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
    .support-count {
      display: inline-flex;
      align-items: center;
      position: absolute;
      right: 12px;
      bottom: 18px;
      padding: 0 8px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, .2);
      text-align: center;
      .count,
      .icon-keyboard_arrow_right {
        font-size: 10px;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    padding: 0 22px 0 12px;
    line-height: 28px;
    background-color: rgba(7, 17, 27, .2);
    .bulletin-title {
      margin-top: 8px;
      margin-right: 4px;
      width: 22px;
      height: 12px;
      vertical-align: top;
      .bg-images('../../components/header/bulletin');
      background-size: 22px 12px;
    }
    .bulletin-text,
    .icon-keyboard_arrow_right {
      vertical-align: top;
      font-size: 10px;
    }
    .bulletin-text {
      width: 90%;
      .over;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      right: 12px;
      top: 8px;
    }
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7, 17, 27, .8);
    transition: all 0.5s;
    backdrop-filter: blur(10px);
    &.fade-transition {
      opacity: 1;
      background: rgba(7, 17, 27, .8)
    }
    &.fade-enter,
    &.fade-leave {
      opacity: 0;
      background: rgba(7, 17, 27, 0)
    }
    .detail-wrapper {
      min-height: 100%;
      .detail-main {
        padding-top: 64px;
        padding-bottom: 64px;
        font-size: 12px;
        .name {
          text-align: center;
          font-size: 16px;
          line-height: 16px;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .supports-wrapper {
          width: 80%;
          margin: 0 auto;
          .support-item {
            display: flex;
            align-items: center;
            padding: 0 12px;
            margin-bottom: 12px;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              margin-right: 6px;
              width: 16px;
              height: 16px;
              background-size: 16px;
            }
            .text {
              font-size: 12px;
              line-height: 12px;
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12px;
            font-size: 12px;
            line-height: 24px;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      margin: -64px auto 0;
      width: 32px;
      height: 32px;
      font-size: 32px;
    }
  }
  .support-item {
    align-items: center;
    font-size: 0;
    .icon {
      &.decrease {
        .bg-images('../../components/header/decrease_1');
      }
      &.discount {
        .bg-images('../../components/header/discount_1');
      }
      &.guarantee {
        .bg-images('../../components/header/guarantee_1');
      }
      &.invoice {
        .bg-images('../../components/header/invoice_1');
      }
      &.special {
        .bg-images('../../components/header/special_1');
      }
    }
  }
}
</style>
