<template>
  <div class="header">
    <!-- <div class="header-box">
      <div class="header-left clearfix">
        <div class="header-img fl">
          <img :src="seller.avatar" width="64" height="64" alt="">
        </div>
        <div class="header-title">
          <h3 class="bold"><img src="brand@2x.png" height="18" width="30" alt="">{{seller.name}}</h3>
          <em class="thin">{{seller.description}} / {{seller.deliveryTime}}分钟送达</em>
          <span><img src="decrease_1@2x.png" width="14" height="14" alt="">在线支付满28减5，满50减10</span>
        </div>
      </div>
      <a class="header-right thin">5个 <span class="icon icon-keyboard_arrow_right fr"></span></a>
    </div>
    <div class="proclamation thin">
      <p class="over"><img src="bulletin@2x.png" height="12" width="22" alt="">公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告</p>
      <span class="icon icon-keyboard_arrow_right"></span>
    </div> -->
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
          <span class="icon inline-block"></span>
          <span class="text thin">{{seller.supports[0].description}}</span>
        </div>
        <a class="header-right thin">5个 <span class="icon icon-keyboard_arrow_right fr"></span></a>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    seller: {
      type: Object
    }
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
    padding: 24px 12px 18px 24px;
    .content {
      margin-left: 16px;
      .title {
        display: -webkit-inline-flex;
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
          line-height: 1;
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
        display: -webkit-inline-flex;
        display: inline-flex;
        align-items: center;
        font-size: 10px;
        .icon {
          margin-right: 4px;
          width: 14px;
          height: 14px;
          .bg-images('../../components/header/decrease_1');
          background-size: 14px;
        }
      }
    }
  }
}

.header-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 24px 12px 18px 24px;
  .header-img {
    overflow: hidden;
    background-color: #eee;
    border-radius: 2px;
    img {
      vertical-align: middle;
    }
  }
  .header-title {
    margin-top: 2px;
    margin-bottom: 2px;
    margin-left: 64px;
    padding-left: 16px;
    h3 {
      margin-bottom: 8px;
      font-size: 16px;
      img {
        margin-right: 6px;
        vertical-align: bottom;
      }
    }
    em,
    span {
      display: block;
      line-height: 12px;
    }
    em {
      margin-bottom: 10px;
      font-size: 12px;
      font-style: normal;
    }
    span {
      font-size: 10px;
      img {
        margin-right: 4px;
        vertical-align: bottom;
      }
    }
  }
  .header-right {
    padding: 7px 8px;
    background: rgba(0, 0, 0, .2);
    color: #fff;
    border-radius: 12px;
    font-size: 10px;
    line-height: 1;
    .icon {
      margin-left: 2px;
      font-size: 10px;
    }
  }
}

.proclamation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  background: rgba(7, 17, 27, .2);
  p {
    font-size: 10px;
    line-height: 28px;
    img {
      vertical-align: text-top;
      margin-right: 4px;
    }
  }
}
</style>
