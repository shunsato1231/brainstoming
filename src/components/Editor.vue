<template lang="pug">
  .wrap
    h1 テーマ入力
    .content
      p ブレインストーミングのテーマを入力してください
      input(type="text" v-model="theme.title" placeholder="テーマ入力" required)
      button(@click="submit") 新規作成
</template>

<script>
import { mapGetters } from 'vuex'

const themeTemplate = {
  title: ''
}

export default {
  computed: {
    ...mapGetters(['currentTheme', 'currentThemeID'])
  },
  data () {
    return {
      theme: {}
    }
  },
  created () {
    this.theme = Object.assign({}, themeTemplate, this.currentTheme)
    if (this.currentThemeID) this.$store.dispatch('fetchTheme')
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    submit () {
      if (!this.theme.title) {
        Materialize.toast('required title', 4000, 'red')
      } else {
        var methodName = ''
        var methodComment = ''
        if (this.$route.name === 'updateEditor') [methodName, methodComment] = ['updateTheme', 'Update']
        else if (this.$route.name === 'newEditor') [methodName, methodComment] = ['addTheme', 'Add']
        this.$store.dispatch(methodName, this.theme)
          .then(key => {
            Materialize.toast('Success ' + methodComment, 4000, 'green')
            this.$router.push({name: 'viewer', params: { id: key }})
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
}

.content{
  width: 90%;
  margin: 100px auto 0;
}

input{
  width: 100%;
  height: 35px;
  margin: 20px 0;
  padding: 5px 15px;
  background-color: #eee;
  color: #666;
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
