<style scoped lang='stylus'>
.indexmusic {
    overflow-y: scroll;
    h3 {
        font-weight: normal;
        padding: 2% 0;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
    }
    h3::before {
        content: "|";
        color: #c20c0c;
        font-size: 12px;
        background: #c20c0c;
        margin: 0 5px;
        position: relative;
        top: -1px;
    }
    .albumList {
        .list {
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    width: 33.33%;
                    div {
                        width: 100%;
                        img {
                            width: 100%;
                            display: block;
                        }
                    }
                    p {
                        height: 24px;
                        line-height: 24px;
                    }
                }
            }
        }
    }
    .recommendList {
        ul {
            li {
                overflow: hidden;
                border-top: 1px solid #ccc;
                span.index {
                    float: left;
                    height: 40px;
                    width: 40px;
                    line-height: 40px;
                    text-align: center;
                }
                div {
                    float: left;
                    padding: 4px 0;
                    p {
                        font-size: 12px;
                    }
                }
                span.icon-bofang {
                    float: right;
                    height: 40px;
                    width: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 26px;
                }
            }
            li:first-child {
                border-top: none;
            }
        }
    }
}

</style>
<template>
    <div class="indexmusic" v-height="50">
        <vui-swiper-x :swiperArr="swiperArr"></vui-swiper-x>
        <div class="albumList">
            <h3>专辑列表</h3>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in albumList" @click="showAlbum(item,index)">
                        <div>
                            <img :src="item.albumImgSrc">
                        </div>
                        <p>{{item.albumTitle}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="recommendList">
            <h3>热歌列表</h3>
            <ul>
                <li v-for="(item, index) in recommendList" @click="playRecomment(recommendList,index)">
                    <span class="index">{{index + 1}}</span>
                    <div>
                        <p>{{item.musicName}}</p>
                        <p>{{item.musicSinger}}</p>
                    </div>
                    <span class="iconfont icon-bofang"></span>
                </li>
            </ul>
        </div>
        <div>
            <transition name="slide">
                <album v-if="$store.state.album.isShowAlbum" :albumList="albumList[$store.state.album.index]"></album>
            </transition>
        </div>
    </div>
</template>
<script>
import VuiSwiperX from "../../components/swiper.vue"

import album from "../../components/album.vue"
export default {
    data() {
        return {
            // 轮播图数据
            swiperArr: [{
                imgUrl: "http://p1.music.126.net/piXJCyIWqYGWEYy2AFnoBA==/19047939440081948.jpg",
            }, {
                imgUrl: "http://p1.music.126.net/-pzOigsoJj3vZehOQqj6vA==/18801648837108169.jpg",
            }, {
                imgUrl: "http://p1.music.126.net/JFBuZQCQJF9vCwsp3tnhzg==/18801648837108172.jpg",
            }, {
                imgUrl: "http://p1.music.126.net/tN-BGO2bOm59xLvf7WOhCA==/18963277044745659.jpg",
            }, {
                imgUrl: "http://p1.music.126.net/QlMwys9zc4Bg3Rm5qj8fsA==/19161189137713255.jpg",
            }],

        }
    },
    created() {
        this.$store.dispatch("GETALL")
    },
    computed: {
        albumList() {
            return this.$store.state.mapList.albumList
        },
        recommendList() {
            return this.$store.state.mapList.recommendList
        }
    },
    methods: {
        // 播放热门歌曲的事件
        playRecomment(recommendList, index) {
            this.$store.commit("PLAYAUDIO", {
                playType:0,
                isShowPlayer: true,
                album: recommendList,
                index: index,
                playerBg: recommendList[index].playerBg,
                albumImgSrc: recommendList[index].albumImgSrc
            }); 
        },
        showAlbum(item, index) {

            // 显示 专辑页面
            this.$store.commit("SHOWORHIDEALBUM", {
                isShowAlbum: true,
                // 传入点击这张专辑
                album: item,
                // 这是第几张专辑
                index: index
            });
        }
    },
    components: {
        VuiSwiperX,
        album
    }
}

</script>
