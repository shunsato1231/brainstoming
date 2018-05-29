<template lang ="pug">
	header
		router-link(tag="h1" to="/" exact) ブレインストーミング支援ツール
		input(id="navTgl" type="checkbox")
		label.open(for="navTgl")
			div.toggle
			div.toggle
			div.toggle
		nav(v-if="!user.loggedIn")
			ul
				router-link(tag="li" to="/list") ブレインストーミング一覧
				li(@click="signIn") サインイン
		nav(v-if="user.loggedIn")
			ul
				router-link(tag="li" to="/editor") 新規作成
				router-link(tag="li" to="/list") ブレインストーミング一覧
				li(@click="signOut") サインアウト
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

header{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 50px;
	border-top: $blue solid 3px;
	border-bottom: #eee solid 1px;
	background-color: #fff;
	padding: 0 5%;
	font-size:0;
	@include clearfix;
}

h1{
	float: left;
	cursor: pointer;
	font-family: "ヒラギノ角ゴ StdN W8", "Hiragino Kaku Gothic StdN", "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, "ＭＳ ゴシック", sans-serif;;
  font-weight: 700;
	@include font-size(18);
	line-height: 46px;
	color: $blue;
}

input{
	display: none;
}

label{
	display: none;
}

nav{
	float: right;
	height: 46px;
	line-height: 46px;
	ul{
		@include clearfix;
	}
	li{
		color: #999;
		float: left;
		position: relative;
		cursor: pointer;
		@include font-size(12);
		padding: 0 10px;
		margin: 0 5px;
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
	    &:after{
	      width: 100%;
			}
    }
	}
	.router-link-active{
		&:after{
			width: 100%;
		}
	}
}

@include small-and-mid{
	nav{
		position: fixed;
		right: 0;
		top: 0;
		margin: -500% 0;
		padding: 500% 0;
		width: 250px;
		float: none;
		background-color: #f6f6f6;
		height: 100%;
		z-index: 9998;
		transform: translateX(100%);
		-webkit-transform: translateX(100%);
		@include transition;
		ul{
			padding-top: 60px;
			li{
				margin-left: 15px;
				padding: 0 5px;
			}
		}
	}

	label{
		cursor: pointer;
	}

	.open{
		display: block;
    position: relative;
    width: 25px;
    height: 15px;
    position: fixed;
    top: 15px;
    right: 5%;
		z-index: 9999;
		@include transition;
		&:after{
			content: 'menu';
			position: absolute;
			bottom: -15px;
			left: 0;
			display: block;
			@include font-size(10);
			width: 100%;
			text-align: center;
		}
		&:hover{
			.toggle{
				&:after{
					width: 100%;
					-webkit-transform: scaleX(1);
					transform: scaleX(1);
			    -webkit-transform-origin: 0% 0%;
			    transform-origin: 0% 0%;
				}
			}
		}
	}
	.toggle{
		background-color: $blue;
		position: absolute;
    width: 25px;
    height: 3px;
    left: 0;
		position: absolute;
    -webkit-transition-property: -webkit-transform;
    transition-property: transform;
    -webkit-transition-duration: 0.8s;
    transition-duration: 0.8s;
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
    -webkit-transition-timing-function: cubic-bezier(1, 0, 0, 1);
    transition-timing-function: cubic-bezier(1, 0, 0, 1);
		-webkit-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
		&:after{
			content: ' ';
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: 100%;
	    -webkit-transform: scaleX(0);
	    transform: scaleX(0);
	    -webkit-transform-origin: 100% 0%;
	    transform-origin: 100% 0%;
			height: 3px;
			background: #ccc;
		}
		&:nth-child(1){
			&:after{
		    -webkit-transition-property: -webkit-transform;
		    transition-property: transform;
		    -webkit-transition-duration: 0.4s;
		    transition-duration: 0.4s;
		    -webkit-transition-delay: 0;
		    transition-delay: 0;
		    -webkit-transition-timing-function: cubic-bezier(1, 0, 0, 1);
		    transition-timing-function: cubic-bezier(1, 0, 0, 1);
			}
		}
		&:nth-child(2){
			top: 6px;
			-webkit-transition: opacity 0.4s linear;
	    -webkit-transition-delay: 0.5s;
	    transition: opacity 0.4s linear 0.5s;
			&:after{
				-webkit-transition-property: -webkit-transform;
				transition-property: transform;
				-webkit-transition-duration: 0.4s;
				transition-duration: 0.4s;
				-webkit-transition-delay: 0.1s;
				transition-delay: 0.1s;
				-webkit-transition-timing-function: cubic-bezier(1, 0, 0, 1);
				transition-timing-function: cubic-bezier(1, 0, 0, 1);
			}
		}
		&:nth-child(3){
			top: 12px;
			&:after{
				-webkit-transition-property: -webkit-transform;
				transition-property: transform;
				-webkit-transition-duration: 0.4s;
				transition-duration: 0.4s;
				-webkit-transition-delay: 0.2s;
				transition-delay: 0.2s;
				-webkit-transition-timing-function: cubic-bezier(1, 0, 0, 1);
				transition-timing-function: cubic-bezier(1, 0, 0, 1);
			}
		}
	}
	#navTgl:checked{
		& ~ .open{
			right: 210px;
			//transform: translateX(-200px);
			//-webkit-transform: translateX(-200px);
		}
		& ~ nav{
			transform: translateX(0);
			-webkit-transform: translateX(0);
		}
		& ~ .open{
			& > .toggle{
				&:nth-child(1){
					-webkit-transform: translateY(6px) rotate(-45deg);
			    transform: translateY(6px) rotate(-45deg);
				}

				&:nth-child(2){
					-webkit-transition: opacity 0.4s linear;
			    -webkit-transition-delay: 0s;
			    transition: opacity 0.4s linear 0s;
			    opacity: 0;
				}

				&:nth-child(3){
					-webkit-transform: translateY(-6px) rotate(45deg);
					transform: translateY(-6px) rotate(45deg);
				}
			}
		}
	}
}

@include small{
	header{
		padding: 0 2.5%;
	}

	h1{
		@include font-size(16);
	}

	.open{
		right: 2.5%;
	}

	.signIn{
		width: 30px;
		font-size: 0;
	}
}
</style>
