<template>
  <div class="upload">
    <!--用来存放item-->
    <div id="{{list}}" class="uploader-list"></div>
    <div id="{{picker}}">选择图片</div>
  </div>
</template>
<script type="text/ecmascript-6">
import $ from 'static/js/jquery-vendor.js'
import WebUploader from 'webuploader'
const BASE_URL = 'static/'
export default {
  props: {
    list: {
      type: String
    },
    picker: {
      type: String
    }
  },
  data() {
    return {
      uploader: '',
      thumbnailWidth: 200,
      thumbnailHeight: 200
    }
  },
  ready() {
    this.uploader = WebUploader.create({

      // 选完文件后，是否自动上传。
      auto: false,

      // swf文件路径
      swf: BASE_URL + '/data/Uploader.swf',

      // 文件接收服务端。
      server: 'http://webuploader.duapp.com/server/fileupload.php',

      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick: '#' + this.picker,

      // 只允许选择图片文件。
      accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
      }
    })
    this.listener()
  },
  methods: {
    listener() {
      // 当有文件添加进来的时候
      this.uploader.on('fileQueued', function (file) {
        var $li = $(
          '<div id="' + file.id + '" class="file-item thumbnail">' +
          '<img>' +
          '<div class="info">' + file.name + '</div>' +
          '</div>'
        )
        var $img = $li.find('img')
        $('#fileList').append($li)
        this.makeThumb(file, function (error, src) {
          if (error) {
            $img.replaceWith('<span>不能预览</span>')
            return
          }
          $img.attr('src', src)
        }, this.thumbnailWidth, this.thumbnailHeight)
      })
    }
  }
}
</script>
<style lang="less" style="text/less">
@import "../../static/css/webuploader";
</style>
