<template>
  <div class="add-btn" ref="backDom" @click="clickAction">
    <el-icon style="font-size: 2.5rem;color: white">
      <Plus style="color:white;"/>
    </el-icon>
  </div>
</template>

<script>
import {CirclePlus, Plus} from "@element-plus/icons-vue";
export default {
  name: "TouchButton",
  components: {Plus, CirclePlus},
  props:{
    clickAction: {
      type: Function,
      default: ()=> {}
    },
    width: {
      type: String,
      default: '80px'
    },
    height: {
      type: String,
      default: '80px'
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.handlerDrag();
    })
  },
  methods: {
    // 华东按钮
    handlerDrag() {
      let dom = this.$refs.backDom
      //限制最大宽高，不让滑块出去
      let maxW = document.body.clientWidth - dom.offsetWidth
      let maxH = document.body.clientHeight - dom.offsetHeight
      let oL, oT
      //手指触摸开始，记录div的初始位置
      dom.addEventListener('touchstart', function (e) {
        let ev = e || window.event
        let touch = ev.targetTouches[0]
        oL = touch.clientX - dom.offsetLeft
        oT = touch.clientY - dom.offsetTop
        document.addEventListener('touchmove', defaultEvent, false)
      }, {passive: false})
      //触摸中的，位置记录
      dom.addEventListener('touchmove', function (e) {
        let ev = e || window.event
        let touch = ev.targetTouches[0]
        let oLeft = touch.clientX - oL
        let oTop = touch.clientY - oT
        if (oLeft < 0) {
          oLeft = 0
        } else if (oLeft >= maxW) {
          oLeft = maxW
        }
        if (oTop < 0) {
          oTop = 0
        } else if (oTop >= maxH) {
          oTop = maxH
        }
        dom.style.left = oLeft + 'px'
        dom.style.top = oTop + 'px'
      }, {passive: false})
      //触摸结束时的处理
      dom.addEventListener('touchend', function () {
        document.removeEventListener('touchmove', defaultEvent)
      })

      //阻止默认事件
      function defaultEvent(e) {
        e.preventDefault()
      }
    }
  }
}
</script>

<style scoped>
.add-btn {
  width: 70px;
  height: 70px;
  line-height: 70px;
  border-radius: 80px;
  padding: 0;
  position: absolute;
  bottom: 80px;
  right: 10px;
  background: #0077aa;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 9000;
  opacity: 0.4;
}
</style>