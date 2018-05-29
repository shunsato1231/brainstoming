<template lang="pug">
.viewer
  h1 {{theme.title}}
    span created by {{theme.author.name}}
  svg.canvas(xmlns="http://www.w3.org/2000/svg", :width = 'x', :height = 'y')
    idea(v-for="(idea, key) in orderedIdeas"
      :idea="idea",
      :initial-x="500 + Math.random() * 500"
      :initial-y="Math.random() * 500"
      :picked="picked"
      @send-color-flag = "getColorFlag")

  footer
    form#colorbar
      input(type='radio', name='color', value='red', v-model="picked", id="red")
      label.Red(for='red')
      input(type='radio', name='color', value='orange', v-model="picked", id='orange')
      label.Orange(for='orange')
      input(type='radio', name='color', value='yellow', v-model="picked", id='yellow')
      label.Yellow(for='yellow')
      input(type='radio', name='color', value='green', v-model="picked", id='green')
      label.Green(for='green')
      input(type='radio', name='color', value='lightBlue', v-model="picked", id='lightblue')
      label.LightBlue(for='lightblue')
      input(type='radio', name='color', value='blue', v-model="picked", id='blue')
      label.Blue(for='blue')
      input(type='radio', name='color', value='purple', v-model="picked", id='purple')
      label.Purple(for='purple')
</template>

<script>
import { mapGetters } from 'vuex'
import Idea from './Idea.vue'
import _ from 'lodash'
import result from '../api/getRelatedImages'

const themeTemplate = {
  title: '',
  created: 0,
  modified: 0,
  author: {
    uid: '',
    name: ''
  }
}

export default {
  components: { Idea },
  data() {
      return {
        x: 1280,
        y: 726,
        picked: ''
      }
  },
  created () {
    this.$store.dispatch('fetchTheme')
    this.$store.dispatch('fetchIdeas')
  },
  computed: {
    ...mapGetters(['currentTheme', 'currentThemeID', 'ideas']),
    theme () {
      return Object.assign({}, themeTemplate, this.currentTheme)
    },
    orderedIdeas () {
      return _
        .chain(this.ideas)
        .forEach((value, key, a) => {
          value.key = key
          return value
        })
        .value()
    }
  },
  methods: {
    getColorFlag(text){
      this.colorFlag = text
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/mixin";
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  width: 100%;
}

.viewer {
  height: 100%;
  width: 100%;
}

.canvas {
  display: block;
  margin: 0;
  padding: 0;
}

h1{
  position: fixed;
  left: 5%;
  top: 5%;
  display: table;
  padding: 50px 5px 2px;
  color: $blue;
  @include font-size(14);
  border-bottom: $blue solid 2px;
  span{
    padding-left: 15px;
    font-weight: normal;
    color: #666;
    @include font-size(10);
  }
}

input[type=radio]{
  display: none;
}

input[type="radio"]:checked + label {
  border: solid 4px #666;
}

footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: #f6f6f6;
  #colorbar{
    display: flex;
    padding: 0 20px;
    .Red{
      margin-top: 10px;
      margin-right: 8px;
      width: 20px;
      height: 20px;
      background-color: #de4e47;
    }
    .Orange{
      margin: 10px 8px;
      width: 20px;
      height: 20px;
      background-color: #e8b255;
    }
    .Yellow{
      margin: 10px 8px;
      width: 20px;
      height: 20px;
      background-color: #fdf475;
    }
    .Green{
      margin: 10px 8px;
      width: 20px;
      height: 20px;
      background-color: #b7e959;
    }
    .LightBlue{
      margin: 10px 8px;
      width: 20px;
      height: 20px;
      background-color: #9bd6f7;
    }
    .Blue{
      margin: 10px 8px;
      width: 20px;
      height: 20px;
      background-color: #5e94e1;
    }
    .Purple{
      margin: 10px 8px;
      width: 20px;
      height: 20px;
      background-color: #a042e7;
    }
    .ideaText{
      font-size: 10px;
      text-align: center;
    }
  }
}
</style>
