<template>
  <div class="divider-title">
    <div class="line"></div>
    <div class="text blod">{{ info }}</div>
    <div class="line"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    info: {
      type: String
    }
  }
}
</script>
<style lang="less" style="text/less">
@import (reference) "../../static/css/index.less";
.divider-title {
  display: flex;
  width: 80%;
  margin: 28px auto 24px;
  .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, .2)
  }
  .text {
    padding: 0 12px;
    font-size: 14px;
  }
}
</style>
