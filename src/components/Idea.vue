<template lang="pug">
  g.idea(@mousedown="handleMouseDown", :cx="x" ,:cy="y", @click="changeColor")
    circle(r='40',:cx="x", :cy="y", :class="color")
    circle(r='65', style='fill-opacity: 0; stroke: rgb(228, 231, 231); stroke-width: 10;',:cx="x" ,:cy="y")
    foreignObject(:x="x-30", :y="y-30", width='60', height='60')
      div.ideaText(xmlns="http://www.w3.org/1999/xhtml", :x="x", :y="y") {{idea.body}}
    image(width='45', height='45', :xlink:href="idea.image0", :x='x-20', :y='y-85')
    image(width='45', height='45', :xlink:href='idea.image1', :x='x+35', :y='y-55')
    image(width='45', height='45', :xlink:href='idea.image2', :x='x+35', :y='y+20')
    image(width='45', height='45', :xlink:href='idea.image3', :x='x-20', :y='y+45')
    image(width='45', height='45', :xlink:href='idea.image4', :x='x-75', :y='y+20')
    image(width='45', height='45', :xlink:href='idea.image5', :x='x-75', :y='y-55')
</template>

<script>
import moment from 'moment';
export default {
  name: 'Idea',
  props: ['idea', 'initialX', 'initialY', 'picked'],
  data() {
      return {
          isMouseDown: false,
          beforeMouseX: null,
          beforeMouseY: null,
          x: this.initialX,
          y: this.initialY,
          color: null,
          colorFlag: [],
          up: window.ontouchstart===null?"touchend":"mouseup",
          move: window.ontouchstart===null?"touchmove":"mousemove"
      }
  },
  mounted() {
        document.addEventListener(this.up, this.handleMouseUp)
        document.addEventListener(this.move, this.handleMouseMove)
        this.color = 'gray'
    },
  unmounted() {
        document.removeEventListener(this.up, this.handleMouseUp)
        document.removeEventListener(this.move, this.handleMouseMove)
  },
  methods: {
        handleMouseDown(event) {
          event.preventDefault();
          this.isMouseDown = true
        },
        handleMouseUp(event) {
          this.isMouseDown = false
        },
        handleMouseMove(event) {
          if (!this.isMouseDown) return
  		    let mouseX = event.clientX
          let mouseY = event.clientY
          let dx = 0;
          let dy = 0;
          if (this.beforeMouseX && this.beforeMouseY) {
              dx = mouseX - this.beforeMouseX
              dy = mouseY - this.beforeMouseY
          }
          this.beforeMouseX = mouseX
          this.beforeMouseY = mouseY
          this.x += dx
          this.y += dy
        },
        changeColor(){
          if(this.picked !== ''){
            var changeColor = this.picked
            this.color = changeColor

            if(this.pickes !== changeColor)
              this.colorFlag.push(changeColor)
          }
        }
    }
}
</script>

<style scoped lang="scss">
.ideaText{
  font-size: 10px;
  text-align: center;
  color: #fff;
}

.gray{
  fill: #aaa;
}

.red{
  fill: #de4e47;
}
.orange{
  fill: #e8b255;
}
.yellow{
  fill: #fdf475;
}
.green{
  fill: #b7e959;
}
.lightBlue{
  fill: #9bd6f7;
}
.blue{
  fill: #5e94e1;
}

.purple{
  fill: #a042e7;
}
</style>
