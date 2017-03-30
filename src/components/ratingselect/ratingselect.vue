<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="inline-block positive" :class="{'active':selectType===2}">{{desc.all}}<strong class="count normal">{{ratings.length}}</strong></span>
      <span @click="select(0,$event)" class="inline-block positive" :class="{'active':selectType===0}">{{desc.positive}}<strong class="count normal">{{positives.length}}</strong></span>
      <span @click="select(1,$event)" class="inline-block nagetive" :class="{'active':selectType===1}">{{desc.negative}}<strong class="count normal">{{negatives.length}}</strong></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
      <i class="icon-check_circle"></i>
      <span class="inline-block text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return
      }
      this.selectType = type
      this.$dispatch('ratingtype.select', type)
    },
    toggleContent(event) {
      if (!event._constructed) {
        return
      }
      this.onlyContent = !this.onlyContent
      this.$dispatch('content.toggle', this.onlyContent)
    }
  }
}
</script>
<style lang="less" style="text/less">
@import (reference) "../../static/css/index.less";
.ratingselect {
  .rating-type {
    margin: 0 18px;
    padding: 18px 0;
    .border-1px(rgba(7, 17, 27, .1));
    font-size: 0;
    span {
      margin-right: 8px;
      padding: 8px 12px;
      border-radius: 1px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      line-height: 16px;
      .count {
        margin-left: 2px;
        font-size: 8px;
        vertical-align: top;
      }
      &.active {
        color: #fff;
      }
    }
    .positive {
      background: rgba(0, 160, 220, .2);
      &.active {
        background: rgba(0, 160, 220, .8);
      }
    }
    .nagetive {
      background: rgba(77, 85, 93, .2);
      &.active {
        background: rgba(77, 85, 93, .8);
      }
    }
  }
  .switch {
    padding: 12px 18px;
    line-height: 24px;
    font-size: 0;
    .border-1px(rgba(7, 17, 27, .1));
    color: rgb(147, 153, 159);
    &.on {
      .icon-check_circle {
        color: #00c850;
      }
    }
    .icon-check_circle {
      margin-right: 4px;
      font-size: 24px;
    }
    .text {
      vertical-align: top;
      font-size: 12px;
    }
  }
}
</style>
