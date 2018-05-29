<template lang="pug">
  .wrap
    h1 ブレインストーミング一覧
    .content
      .tab(v-if="user.loggedIn")
        a(:class="{ active: currentTimeLine === 'public' }" @click="switchTimeLine('public')") Public
        a(:class="{ active: currentTimeLine === 'myself' }" @click="switchTimeLine('myself')") Myself
      theme(v-for="(theme, key) in orderedThemes"
        :theme="theme")
      a(@click="fetchThemes({count: 10, type: currentTimeLine})") fetch more themes
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Theme from './Theme.vue'
import _ from 'lodash'

export default {
  components: { Theme },
  computed: {
    ...mapGetters(['themes', 'currentUserId', 'user']),
    orderedThemes () {
      return _
        .chain(this.themes)
        .forEach((value, key, a) => {
          value.key = key
          return value
        })
        .filter(theme => {
          if (this.currentTimeLine === 'public') return true
          else if (theme.author.uid === this.currentUserId) return true
          return false
        })
        .orderBy('created', 'desc')
        .value()
    }
  },
  data () {
    return {
      currentTimeLine: 'public'
    }
  },
  methods: {
    ...mapActions(['fetchThemes']),
    switchTimeLine (val) {
      this.currentTimeLine = val
      this.$store.dispatch('fetchThemes', {
        count: 10,
        type: val
      })
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
  margin: 30px auto 0;
}
.tab{
  display: flex;
  a{
    display: block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #f0f0f0;
    @include font-size(12);
    &:hover{
      text-decoration: none;
      background-color: #fafafa;
    }
  }
  .active{
    background-color: #fafafa;
  }
}
</style>
