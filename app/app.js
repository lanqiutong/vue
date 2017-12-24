import Vue from 'vue'
import Vuex from 'vuex'
import app from './app.vue'
import VueRouter from 'vue-router'
import directives from './plugins/directives.js'

Vue.use(VueRouter)
Vue.use(directives)
Vue.use(Vuex);
const routes = [{
    path: '/indexmusic',
    name: '音乐首页',
    component: require("./views/indexmusic/index.vue").default
}, {
    path: '/findmusic',
    name: '发现音乐',
    component: require("./views/findmusic/index.vue").default
}, {
    path: '/mymusic',
    name: '我的音乐',
    component: require("./views/mymusic/index.vue").default
}, {
    path: '*',
    redirect: '/indexmusic'
}]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})
const store = new Vuex.Store({
    state: {
        mapList: [],
        album: {
            isShowAlbum: false, //专辑页面默认隐藏
            albumList: [], //专辑默认列表
            index: 0 // 专辑默认下标
        },
        player: {
            isShowPlayer: false,
            index: null
        }
    },
    mutations: {
        GETALL(state, payload) {
            state.mapList = payload.mapList
            // console.log(payload.mapList);
        },
        SHOWORHIDEALBUM(state, payload) {
            // 显示或者隐藏专辑页面
            state.album.isShowAlbum = payload.isShowAlbum
            state.album.albumList = payload.album
            state.album.index = payload.index
        },
        SHOWORHIDEPLAYER(state, payload) {
            // 这是显示 和隐藏播放器 在app.vue里面控制
            state.player.isShowPlayer = payload.isShowPlayer
        },
        PLAYAUDIO(state, payload) {
            // 使用0 ，1 对播放专辑 和 播放热歌 做区分
            state.player.playType = payload.playType
            state.player.isShowPlayer = payload.isShowPlayer
            state.player.album = payload.album;
            state.player.index = payload.index;
            state.player.playerBg = payload.playerBg;
            state.player.albumImgSrc = payload.albumImgSrc;
            // console.log(payload);
        },
        GOTO(state, payload){
            state.player.index = payload.index;
        }
    },
    actions: {
        // 发送getall 请求 json文件数据
        async GETALL({ commit }, payload) {
            var data = await fetch("../data/data.json").then(res => res.json())
            commit("GETALL", data)
        }
    }
})
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(app)
})
