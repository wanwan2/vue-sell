<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemsClasses" :class="itemClass inline-block" class="star-item"></span>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    size: {
      type: Number
    },
    scope: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    }
  }
}
</script>
<style lang="less" style="text/less">
@import "../../static/css/index.less";
.star {
	font-size: 0;
	&.star-48{
		
	}
	&.star-36{}
	&.star-24{}
	.star-item{
		background-repeat: no-repeat;

	}
}
</style>
