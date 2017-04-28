<template>
  <div id="allmap" :style="mapStyle"></div>
</template>
<script>
export default {
  props: {
    // 经度
    longitude: {
      type: Number,
      default: 116.404
    },
    // 纬度
    latitude: {
      type: Number,
      default: 39.915
    },
    description: {
      type: String,
      default: '天安门'
    }
  },
  data() {
    return {
      mapStyle: {
        width: '100%',
        height: window.screen.availHeight + 'px'
      }
    }
  },
  ready() {
    /* eslint-disable */

    var map = new BMap.Map('allmap')
    var point = new BMap.Point(this.longitude, this.latitude)
    var marker = new BMap.Marker(point)
    map.addOverlay(marker)
    map.centerAndZoom(point, 15)
    var opts = {
      width: 250,
      height: 75,
      title: '地址：'
    }
    var infoWindow = new BMap.InfoWindow(this.description, opts)
    marker.addEventListener('click', function () {
      map.openInfoWindow(infoWindow, point)
    })
    map.enableScrollWheelZoom(true)
    map.openInfoWindow(infoWindow, point)

    /* eslint-enable */
  }
}
</script>
<!--Add"scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
