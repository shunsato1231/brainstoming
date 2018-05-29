<template lang="pug">
.top
  h1 ブレインストーミング支援ツール
  div(v-if="!user.loggedIn")
    router-link(tag="button" to="/list") ブレインストーミング一覧
    div.signIn(@click="signIn")
      img(src="../assets/google-icon.png")
      span Googleでサインインする
    router-link(to="/about") このアプリについて
  div(v-if="user.loggedIn")
    router-link(tag="button" to="/editor") ブレインストーミング新規作成
    router-link(tag="button" to="/list") ブレインストーミング一覧
    button(@click="signOut") サインアウト
    router-link(to="/about" class="AboutSigned") このアプリについて
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Index',
  computed: mapGetters(['user']),
  data () {
    return {
      name: ''
    }
  },
  methods: {
    ...mapActions(['signIn', 'signOut'])
  }
}
</script>

<style scoped lang="scss">
@import "../assets/mixin";
.top{
  position: absolute;
  width: 450px;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  margin-left: -225px;
  margin-top: -190px;
}

.AboutSigned{
  margin-top: 45px;
}

h1{
  width: 450px;
  height: 50px;
  line-height: 50px;
  font-family: "ヒラギノ角ゴ StdN W8", "Hiragino Kaku Gothic StdN", "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, "ＭＳ ゴシック", sans-serif;;
  font-weight: 700;
  text-align: center;
  color: $blue;
  @include font-size(30);
  margin-bottom: 50px;
}

button{
  cursor : pointer;
  display: block;
  margin: 0 auto;
  width: 320px;
  height: 50px;
  line-height: 42px;
  text-align: center;
  background-color: $blue;
  color: #fff;
  @include font-size(14);
  font-weight: normal;
  margin-bottom: 20px;
  border: $blue solid 4px;
  @include transition;
  border-radius: 0;
  &:hover{
    background-color: #fff;
    color: $blue;
    font-style: normal;
  }
}

.signIn{
  cursor : pointer;
  margin: 50px auto;
  width: 320px;
  height: 35px;
  line-height: 32px;
  background-color: #fafafa;
  border: #ccc solid 1px;
  @include font-size(12);
  text-align: center;
  border-radius: 8px;
  @include transition;
  &:hover{
    background-color: #f0f0f0;
  }
  img{
    width: 30px;
    height: 20px;
    margin-bottom: 6px;
  }
}

a{
  display: inline-block;
  position: relative;
  margin-left: 160px;
  height: 25px;
  width: 130px;
  text-align: center;
  @include font-size(12);
  color: $blue;
  @include transition;
  &:before{
    content: "\f05a";
    font-family: FontAwesome;
    @include font-size(15);
    margin-right: 3px;
  }
  &:after{
    position: absolute;
    display: inline-block;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    content: "";
    background: $blue;
    @include transition;
  }
  &:hover{
    text-decoration: none;
    &:after{
      width: 100%;
    }
  }
}

@include small{
  .top{
    width: 320px;
    margin-left: -160px;
    margin-top: -180px;
  }
  .signIn{
    width: 300px;
  }
  .AboutSigned{
    margin-top: 55px;
  }
  h1{
    @include font-size(20);
    width: 320px;
  }
  button{
    width: 300px;
    height: 40px;
    line-height: 32px;
  }
  a{
    margin-left: 95px;
  }
}
</style>
