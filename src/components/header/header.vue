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
        <div class="supports" v-if="seller.supports">
          <span class="icon inline-block" :class="classMap[seller.supports[0].type]"></span>
          <span class="text thin">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count thin">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>
<style lang="less" style="text/less">
@import "../../static/css/index.less";
.header {
  background-color: #eee;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
      .description,
      .supports {
        line-height: 12px;
      }
      .description {
        margin-bottom: 10px;
        font-size: 12px;
      }
      .supports {
        display: inline-flex;
        align-items: center;
        font-size: 10px;
        .icon {
          margin-right: 4px;
          width: 14px;
          height: 14px;
          background-size: 14px;
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
    padding: 0 12px;
    line-height: 28px;
    .over;
    .bulletin-title{
      width: 22px;
      height: 12px;
      .bg-images('../../components/header/bulletin');
      background-size: 22px 12px;
    }
    .bulletin-text {
      font-size: 12px;
    }
  }
}
</style>
