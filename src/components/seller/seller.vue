<template>
  <div class="seller">
    <div id="main">
      <h1 style="color: red;text-align: center;">使用哪个只需要打开相应的注释即可</h1>
      <div id="play">
        <img id="target" v-el:touch-target draggable="false" src="cloud.png" />
      </div>
      <div class="div1">"touch.js demo记录每一次操作"</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import $ from 'static/js/jquery-vendor.js'
import touch from 'touchjs'
export default {
  ready() {
    /* 旋转程序 */
    // var angle = 0
    // touch.on('#target', 'touchstart', function (ev) {
    //   ev.startRotate()
    //   ev.preventDefault()
    // })
    // touch.on('#target', 'rotate', function (ev) {
    //     var totalAngle = angle + ev.rotation
    //     if (ev.fingerStatus === 'end') { // 这一句很重要
    //       angle = angle + ev.rotation
    //       $('.div1').text('本次旋转角度为:' + ev.rotation + '度, 方向:' + ev.direction + '.')
    //     }
    //     this.style.webkitTransform = 'rotate(' + totalAngle + 'deg)'
    //   })
    /* 放大缩小 */
    var target = document.getElementById('target')
    target.style.webkitTransition = 'all ease 0.05s'
    touch.on('#target', 'touchstart', function (ev) {
      ev.preventDefault()
    })
    var initialScale = 1
    var currentScale
    touch.on('#target', 'pinchend', function (ev) {
      currentScale = ev.scale - 1
      currentScale = initialScale + currentScale
        // 自己调节可以放大的最大倍数
      currentScale = currentScale > 5 ? 5 : currentScale
        // 自己调节可以缩小的最小倍数
      currentScale = currentScale < 0.1 ? 0.1 : currentScale
      this.style.webkitTransform = 'scale(' + currentScale + ')'
      $('.div1').text('当前缩放比例为:' + currentScale + '倍.')
    })
    touch.on('#target', 'pinchend', function (ev) {
      initialScale = currentScale
    })

    /* 识别tap[单击], doubletap[双击]和hold[长按]事件 */
    // 识别tap[单击], doubletap[双击]和hold[长按]事件
    // $('.div1').text('识别tap[单击], doubletap[双击]和hold[长按]事件.')
    // touch.on('#target', 'hold tap doubletap', function (ev) {
    //     $('.div1').text('当前事件为: ' + ev.type)
    //     var _this = this
    //     this.classList.add('bounce')
    //     touch.on(this, 'webkitAnimationEnd', function () {
    //       _this.classList.remove('bounce')
    //     })
    //   })
    /* 抓取并拖拽目标元素 */
    // $('.div1').text('抓取并拖拽目标元素')
    // touch.on('#target', 'touchstart', function (ev) {
    //     ev.preventDefault()
    //   })
    //   // var target = document.getElementById("target")
    // var dx, dy
    // touch.on('#target', 'drag', function (ev) {
    //   dx = dx || 0
    //   dy = dy || 0
    //   var offx = dx + ev.x + 'px'
    //   var offy = dy + ev.y + 'px'
    //   this.style.webkitTransform = 'translate3d(' + offx + ',' + offy + ',0)'
    // })
    // touch.on('#target', 'dragend', function (ev) {
    //   dx += ev.x
    //   dy += ev.y
    //   $('.div1').text('当前x值为:' + dx + ', 当前y值为:' + dy + '.')
    // })
    /* 抓取并拖拽目标元素 */
  }
}
</script>
<style>
.seller {
  #main {
    padding: 5px;
  }
  #play {
    background: black;
    width: 100%;
    height: 800px;
    border: 1px solid red;
    position: relative;
    overflow: hidden;
  }
  img {
    position: absolute;
    width: 200px;
    height: 200px;
    display: block;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
    border-radius: 50%;
    border: 1px solid red;
  }
  img:hover {
    cursor: pointer;
  }
  .div1 {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    color: blue;
    font-size: 25px;
    line-height: 50px;
    background: green;
    text-align: center;
  }
}
</style>
