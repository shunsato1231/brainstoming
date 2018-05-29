<template lang="pug">
  .wrap
    h1 {{theme.title}} にアイデアを送信する
    .content
      p 送信するアイデアの内容を入力してください
      textarea(placeholder="アイデアの内容を入力" v-model="idea.body" required)
      button(@click="submit") 送信
      #console_log
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'

const themeTemplate = {
  title: '',
  created: 0,
  modified: 0,
  author: {
    uid: '',
    name: ''
  }
}

const ideaTemplate = {
  body: ''
}

export default {
  computed: {
    ...mapGetters(['currentTheme', 'currentThemeID']),
    theme: function () {
      return Object.assign({}, themeTemplate, this.currentTheme)
    }
  },
  data () {
    return {
      idea: {}
    }
  },
  created () {
    this.$store.dispatch('fetchTheme')
  },
  methods: {
    submit () {
      if (!this.idea.body) {
        Materialize.toast('required title', 4000, 'red')
      } else {
        this.$store.dispatch('addIdea', this.idea)
          .then(key => {
            Materialize.toast('Success', 4000, 'green')
          }).catch(err => {
            Materialize.toast('Error ' + err, 4000, 'red')
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/mixin";
.wrap{
  margin-top: 50px;
  padding: 5% 5% 0;
}

h1{
  display: table;
  padding: 0 5px 2px;
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

.content{
  width: 90%;
  margin: 30px auto 0;
}

textarea{
  width: 100%;
  height: 100px;
  margin: 20px 0;
  padding: 10px;
  background-color: #eee;
  color: #666;
  resize: none;
  @include font-size(14);
  border: none;
  @include placeholderColor(#ccc);
  &:focus{
    outline: 0;
  }
}

button{
  cursor : pointer;
  display: block;
  width: 80px;
  height: 25px;
  margin-left: auto;
  border: $blue solid 2px;
  background-color: #fff;
  @include font-size(12);
  color: $blue;
  border-radius: 0;
  @include transition;
  &:hover{
    background-color: $blue;
    color: #fff;
  }
  &:focus{
    outline: 0;
  }
}

p{
  @include font-size(12);
}
</style>
