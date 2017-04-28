<template>
  <div class="seller" v-el:seller>
    <div class="saller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star class="inline-block" :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}}）</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteTxet}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports-wrapper">
          <li class="support-item" v-for="item in seller.supports">
            <span class="icon inline-block" :class="classMap[seller.supports[$index].type]"></span>
            <span class="text thin">{{seller.supports[$index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" v-el:pic-wrapper>
          <ul class="pic-list" v-el:pic-list>
            <li class="pic-item inline-block" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
    <!--     <upload id="abc" :list="'fileList'" :picker="'filePicker'" v-ref:upload-controler></upload>
    <button id="ctlBtn" class="btn btn-default" @click="startUpload">开始上传</button> -->
  </div>
</template>
<script type="text/ecmascript-6">
// import upload from 'components/upload/upload'
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      favorite: false
    }
  },
  computed: {
    favoriteTxet() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  watch: {
    'seller' () {
      this._initScroll()
      this._initPics()
    }
  },
  ready() {
    this._initScroll()
    this._initPics()
  },
  methods: {
    toggleFavorite(event) {
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$els.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$els.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$els.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
      //   startUpload() {
      //     this.$refs.uploadControler.uploader.upload()
      //   }
    }
  },
  components: {
    star,
    split
    // upload
  }
}
</script>
<style lang="less" style="text/less">
@import (reference) "../../static/css/index.less";
.seller {
  position: absolute;
  top: 174px;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    position: relative;
    padding: 18px;
    .title {
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 14px;
      color: rgb(7, 17, 27);
    }
    .desc {
      padding-bottom: 18px;
      .border-1px(rgba(7, 17, 27, .1));
      font-size: 0;
      .star {
        margin-right: 8px;
      }
      .text {
        margin-top: 12px;
        font-size: 10px;
        line-height: 18px;
        color: rgb(7, 17, 27);
      }
      .star,
      .text {
        vertical-align: top;
      }
    }
    .remark {
      display: flex;
      padding-top: 18px;
      .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, .1);
        &:last-child {
          border-right: none;
        }
        h2 {
          margin-bottom: 4px;
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 159);
        }
        .content {
          line-height: 24px;
          font-size: 10px;
          .stress {
            font-size: 24px;
          }
        }
      }
    }
    .favorite {
      position: absolute;
      right: 13px;
      top: 18px;
      text-align: center;
      .icon-favorite {
        display: block;
        width: 44px;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        text-align: center;
        color: #d4d6d9;
        &.active {
          color: rgb(240, 20, 20)
        }
      }
      .text {
        line-height: 10px;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
  }
  .bulletin {
    padding: 18px 18px 0 18px;
    .title {
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 14px;
      color: rgb(7, 17, 27);
    }
    .content-wrapper {
      padding: 0 12px 16px 12px;
      .border-1px(rgba(7, 17, 27, .1));
      .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
    }
    .supports-wrapper {
      .support-item {
        padding: 16px 12px;
        .border-1px(rgba(7, 17, 27, .1));
        font-size: 0;
        &:last-child {
          border: none;
        }
        .icon {
          margin-right: 6px;
          width: 16px;
          height: 16px;
          background-size: 16px;
          vertical-align: top;
          align-items: center;
          &.decrease {
            .bg-images('../../components/seller/decrease_1');
          }
          &.discount {
            .bg-images('../../components/seller/discount_1');
          }
          &.guarantee {
            .bg-images('../../components/seller/guarantee_1');
          }
          &.invoice {
            .bg-images('../../components/seller/invoice_1');
          }
          &.special {
            .bg-images('../../components/seller/special_1');
          }
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
  .pics {
    padding: 18px;
    .title {
      margin-bottom: 12px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list {
        font-size: 0;
        .pic-item {
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child {
            margin-right: 0
          }
        }
      }
    }
  }
  .info {
    padding: 18px 18px 0;
    .title {
      padding-bottom: 12px;
      .border-1px(rgba(7, 17, 27, .1));
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .info-item {
      padding: 16px 12px;
      line-height: 16px;
      color: rgb(7, 17, 27);
      font-size: 12px;
      &:not(:last-child) {
        .border-1px(rgba(7, 17, 27, .1));
      }
    }
  }
}
</style>
