<template lang="pug">
  article
    h1 {{theme.title}}
    footer
      router-link(tag="button" class="send" :to="{ name: 'send', params: { id: theme.key }}") アイデア送信
      router-link(tag="button" class="show" :to="{ name: 'viewer', params: { id: theme.key }}") ブレインストーミング表示
      div
        span {{theme.created | formatDate }}
        span {{theme.author.name}}
</template>

<script>
import moment from 'moment';
export default {
  name: 'Theme',
  props: ['theme', 'id'],
  filters: {
        formatDate: function (date) {
            return moment(date).format('YYYY/MM/DD');
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/mixin";
article{
  width: 100%;
  padding: 30px 20px 15px;
  border-bottom: #eee solid 2px;
  background-color: #fafafa;
  h1{
    margin-bottom: 20px;
    border: none;
    color: #666;
    @include font-size(14);
    font-weight: normal;
  }
  footer{
    display: flex;
    flex-wrap: wrap;
    div{
      display: table;
      color: #aaa;
      margin-left: auto;
      height: 25px;
      span{
        display: table-cell;
        vertical-align: bottom;
        @include font-size(12);
        padding-left: 10px;
      }
    }
    button{
      cursor : pointer;
      display: block;
      width: 160px;
      height: 25px;
      margin-right: 20px;
      border: $blue solid 2px;
      background-color: #fafafa;
      @include font-size(12);
      color: $blue;
      border-radius: 0;
      @include transition;
      &:hover{
        background-color: $blue;
        color: #fafafa;
      }
      &:focus{
        outline: 0;
      }
    }
  }
}

@include small{
  article{
    padding-bottom: 0;
    h1{
      width: 100%;
      text-align: center;
    }
    footer{
      display: block;
      button{
        margin: 0 auto 10px;
      }
      div{
        margin-top: 10px;
        margin-bottom: 10px;
        span{
          @include font-size(10);
        }
      }
    }
  }
}
</style>
