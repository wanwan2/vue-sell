import touch from 'touchjs'
export default {
  data() {
      return {
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
        }
      }
    },
    methods: {
      log: function (msg) {
        document.querySelector('#logger').textContent = msg
      },
      startRotate: function (ev) {
        ev.startRotate()
        ev.preventDefault()
      },
      startDefault: function (ev) {
        ev.preventDefault()
      },
      rotating: function (ev) {
        var totalAngle = this.angle + ev.rotation
        if (ev.fingerStatus === 'end') {
          this.angle = this.angle + ev.rotation
          this.log('此次滚动角度为:' + ev.rotation + '度, 方向:' + ev.direction + '.')
        }
        ev.target.style.webkitTransform = 'rotate(' + totalAngle + 'deg)'
      },
      scaling: function (ev) {
        this.currentScale = ev.scale - 1
        this.currentScale = this.initialScale + this.currentScale
        this.currentScale = this.currentScale > 2 ? 2 : this.currentScale
        this.currentScale = this.currentScale < 1 ? 1 : this.currentScale
        ev.target.style.webkitTransform = 'scale(' + this.currentScale + ')'
        this.log('当前缩放比例为:' + this.currentScale + '.')
        this.initialScale = this.currentScale
      },
      draging: function (ev) {
        this.dx = this.dx || 0
        this.dy = this.dy || 0

        var offx = this.dx + ev.x + 'px'
        var offy = this.dy + ev.y + 'px'
        ev.target.style.webkitTransform = 'translate3d(' + offx + ',' + offy + ',0)'
      },
      dragend: function (ev) {
        this.dx += ev.x
        this.dy += ev.y
        this.log('当前x值为:' + this.dx + ', 当前y值为:' + this.dy + '.')
      },
      rotate: function () {
        this.log('利用startRotate, 单指触发滚动事件')
          // var angle = 0
        touch.on('#target', 'touchstart', this.startRotate)
        touch.on('#target', 'rotate', this.rotating)
      },
      scale: function () {
        this.log('双指放大与缩小目标.')
        document.querySelector('#logger').style.webkitTransition = 'all ease 0.05s'

        touch.on('#target', 'touchstart', this.startDefault)

        // var initialScale = 1
        // var currentScale

        touch.on('#target', 'pinchend', this.scaling)
      },
      tap: function () {
        this.log('识别tap, doubletap和hold事件.')
          // touch.on('#target', 'touchstart', function(ev){
          // ev.preventDefault();
          // });

        touch.on('#target', 'hold tap doubletap', function (ev) {
          this.log('当前事件为: ' + ev.type)

          var _this = this
          ev.target.classList.add('bounce')
          touch.on(this, 'webkitAnimationEnd', function () {
            _this.classList.remove('bounce')
          })
        })
      },
      drag: function () {
        touch.off('#target', 'touchstart', this.startRotate)
        touch.off('#target', 'rotate', this.rotating)
        this.log('抓取并移动目标')
        touch.on('#target', 'touchstart', this.startDefault)
          // var dx, dy
        touch.on('#target', 'drag', this.draging)

        touch.on('#target', 'dragend', this.dragend)
      },
      touch: function () {
        this.log('识别原生事件')
        touch.on('#target', 'touchstart', function (ev) {
          ev.preventDefault()
        })
        touch.on('#target', 'touchstart touchmove touchend', function (ev) {
          var _this = ev.target
          if (!ev.target.classList.contains('bounce')) {
            if (ev.type === 'mousedown' || ev.type === 'touchstart') {
              ev.target.classList.add('bounce')
              touch.on(ev.target, 'webkitAnimationEnd', function () {
                _this.classList.remove('bounce')
              })
            }
          }
          this.log('当前为原生事件: ' + ev.type)
        })
      }
    }
}
