<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评价</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import header from 'components/header/header.vue'

const ERR_OK = 0

export default {
  data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = response.data
            // console.log(this.seller.avatar)
        }
      })
    },
    components: {
      'v-header': header
    }
}
</script>
<style lang="less" style="text/less">
@import "static/css/index.less";
.tab {
  display: flex;
  width: 100%;
  line-height: 40px;
  .border-1px(rgba(7, 17, 27, .1));
  .tab-item {
    flex: 1;
    text-align: center;
    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
    }
    .active {
      color: rgb(240, 20, 20);
    }
  }
}
</style>
