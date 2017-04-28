<template>
  <div class="touch inline-block">
    <img id="target" v-el:images-template src="cloud.png" draggable="false" alt="">
    <template v-for="icon in icons">
      <i class="icon iconfont" :class="{['icon-' + icon.name]:true,active:this.clearData.state === $index}" @hold="icon.func($index)"></i>
    </template>
  </div>
</template>
<script type="text/ecmascript-6">
import touch from 'touchjs'
export default {
  data() {
      return {
        icons: [{
          name: 'edit',
          func: this.scale
        }, {
          name: 'move',
          func: this.drag
        }, {
          name: 'refresh',
          func: this.rotate
        }, {
          name: 'wrong',
          func: this.remove
        }],
        rotateData: {
          'angle': 0
        },
        scaleData: {
          'initialScale': 1,
          'currentScale': ''
        },
        dragData: {
          'dx': '',
          'dy': ''
        },
        clearData: {
          state: ''
        }
      }
    },
    methods: {
      startRotate(ev) {
        ev.startRotate()
        ev.preventDefault()
      },
      startDefault(ev) {
        ev.preventDefault()
      },
      rotating(ev) {
        var totalAngle = this.rotateData.angle + ev.rotation
        if (ev.fingerStatus === 'end') {
          this.rotateData.angle = this.rotateData.angle + ev.rotation
        }
        this.$el.style.webkitTransform = 'scale(' + this.scaleData.initialScale + ') rotate(' + totalAngle + 'deg)'
      },
      scaling(ev) {
        this.scaleData.currentScale = ev.scale - 1
        this.scaleData.currentScale = this.scaleData.initialScale + this.scaleData.currentScale
        this.scaleData.currentScale = this.scaleData.currentScale > 2 ? 2 : this.scaleData.currentScale
        this.scaleData.currentScale = this.scaleData.currentScale < 1 ? 1 : this.scaleData.currentScale
        this.$el.style.webkitTransform = 'scale(' + this.scaleData.currentScale + ') rotate(' + this.rotateData.angle + 'deg)'
      },
      scaled(ev) {
        this.scaleData.initialScale = this.scaleData.currentScale
      },
      draging(ev) {
        this.dragData.dx = this.dragData.dx || 0
        this.dragData.dy = this.dragData.dy || 0

        var offx = this.dragData.dx + ev.x + 'px'
        var offy = this.dragData.dy + ev.y + 'px'

        this.$el.style.left = offx
        this.$el.style.top = offy
      },
      dragend(ev) {
        this.dragData.dx += ev.x
        this.dragData.dy += ev.y
      },
      rotate($index) {
        this.clear($index)
        touch.on(this.$el, 'touchstart', this.startRotate)
        touch.on(this.$el, 'rotate', this.rotating)
      },
      scale($index) {
        this.clear($index)
        this.$el.style.webkitTransition = 'all ease 0.05s'

        touch.on(this.$el, 'touchstart', this.startDefault)

        touch.on(this.$el, 'pinch', this.scaling)
        touch.on(this.$el, 'pinchend', this.scaled)
      },
      drag($index) {
        this.clear($index)
        touch.on(this.$el, 'touchstart', this.startDefault)
        touch.on(this.$el, 'drag', this.draging)
        touch.on(this.$el, 'dragend', this.dragend)
      },
      clear(act) {
        if (this.clearData.state === act) {
          return
        }
        this.clearData.state = act
        let handlers = this.$el.listeners
        if (handlers) {
          for (let i in handlers) {
            handlers[i].forEach((el) => {
              touch.off(this.$el, i, el)
            })
          }
        }
      },
      remove() {
        window.alert('是否删除元素')
        this.clear('drag')
      }
    }
}
</script>
<style lang="less" style="text/less">
@import (reference) "../../static/css/index.less";
.touch {
  border: 1px solid black;
  position: relative;
  width: 100px;
  i {
    padding: 4px;
    position: absolute;
    border: 1px solid #333;
    border-radius: 50%;
    background: #fff;
    font-family: sans-serif;
    z-index: 20;
    &.icon-edit {
      left: -10px;
      top: -10px;
    }
    &.icon-move {
      right: -10px;
      top: -10px;
    }
    &.icon-refresh {
      left: -10px;
      bottom: -10px;
    }
    &.icon-wrong {
      right: -10px;
      bottom: -10px;
    }
    &.active {
      color: red;
    }
  }
  img {
    display: block;
    width: 100%;
  }
  img:hover {
    cursor: pointer;
  }
}
</style>
