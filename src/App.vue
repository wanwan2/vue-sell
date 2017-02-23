<template>
  <div>
    <v-header></v-header>
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
    <router-view></router-view>
  </div>
</template>
<script>
import header from 'components/header/header.vue'

export default {
  components: {
    'v-header': header
  }
}
</script>
<style>
  @import "../static/css/mixin.css"; 
.tab {
  display: flex;
  width: 100%;
  line-height: 40px;
}

.tab .tab-item {
  flex: 1;
  text-align: center;
}

.tab .tab-item > a{
  display: block;
  font-size: 14px;
  color: rgb(77,85,93);
}

.tab .tab-item > a.active{
  color: rgb(240,20,20);
}

.border-1px:after{
  border-bottom-color: rgba(7,17,27,.1);
}
</style>
