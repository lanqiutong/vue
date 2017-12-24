<style scoped lang='stylus'>
header {
    background: #c20c0c;
    position: relative;
    ul {
        overflow: hidden;
        width: 60%;
        margin: 0 auto;
        li {
            float: left;
            width: 33.333%;
            text-align: center;
            height: 50px;
            font-size: 26px;
            line-height: 50px;
            color: #fff;
        }
        li.cur {
            color: #ff6b64;
        }
    }
    .caidan {
        width: 50px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 50px;
        font-size: 26px;
        line-height: 50px;
        color: #fff;
    }
    .player {
        width: 50px;
        text-align: center;
        position: absolute;
        top: 0;
        right: 0;
        height: 50px;
        font-size: 26px;
        line-height: 50px;
        color: #fff;
    }
}

</style>
<template>
    <div id="app">
        <header>
            <p class="caidan iconfont icon-caidan"></p>
            <ul>
                <li class="iconfont" v-for="item in tabNav" :class="[item.fontClass, {cur:$route.name == item.title}]" @click="routerGo(item)"></li>
            </ul>
            <p class="player iconfont icon-zhuanjiguangpan" @click="showPlayer"></p>
        </header>
        <section>
            <router-view></router-view>
        </section>
        <div v-show="player.isShowPlayer">
            <transition name="slide">
                <audio-play :player = 'player'  ></audio-play>
            </transition>
        </div>
    </div>
</template>
<script>
import AudioPlay from "./components/audioplay.vue"
export default {
    name: 'app',
    data() {
        return {
            tabNav: [{
                title: "音乐首页",
                url: '/indexmusic',
                fontClass: 'icon-music'
            }, {
                title: "发现音乐",
                url: '/findmusic',
                fontClass: 'icon-wangyiyunyinlezizhi-copy'
            }, {
                title: "我的音乐",
                url: '/mymusic',
                fontClass: 'icon-diantai'
            }]
        }
    },
    computed: {
        player() {
            return this.$store.state.player
        }
    },
    methods: {
        routerGo(item) {
            // 点击路由跳转
            this.$router.push({ path: item.url })
        },
        showPlayer() {
            this.$store.commit("SHOWORHIDEPLAYER", {
                isShowPlayer: true
            })
        }
    },
    components: {
        AudioPlay
    }
}

</script>
