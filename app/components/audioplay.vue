<style scoped lang='stylus' src="./audioplay.styl"></style>
<template>
    <div class="player" v-height :style="{background :'#223950 url('+ player.playerBg +') 0 0 /100% 100% no-repeat'}">
        <span v-if="typeof player.index == 'number'">   
            <audio id="audio" :src="player.album[player.index].musicUrl" autoplay :loop="playState == 'once'" @timeupdate="play()"></audio> 
        </span>
        <header>
            {{player.index == null ? '播放器' : player.album[player.index].musicName}}
            <span @click="goBack" class="iconfont icon-houtui1"></span>
        </header>
        <div class="content_cd" v-show="!isShowLyric" @click="showLyric" v-height="300">
            <div class="swith" :class="{cur :addSwithClass}">
                <img src="../../resource/img/swith.png">
            </div>
            <div class="cd" :class="{cur :addSwithClass}">
                <img src="../../resource/img/cd.png" class="imgCd">
                <div class="singerImg">
                    <img :src="player.albumImgSrc" alt="">
                </div>
            </div>
        </div>
        <div class="lyric" v-show="isShowLyric" @click="hideLyric" v-height="250">
            <ul>
                <li v-for="(item,index) in lyric" class="animationLyric" :class="[{cur:currentTime > lyric[index][0]&&currentTime + (lyric[index][0] - lyric[index <= 0 ? 0 : index + 1 > lyric.length - 1 ? lyric.length - 1 : index  + 1][0]) < lyric[index][0]}]">
                    <span class="animationLyric_oragin">{{item[1]}}</span>
                    <span class="animationLyric_current" :time="parseFloat(lyric[index + 1 > lyric.length - 1 ? lyric.length - 1 : index  + 1])-parseFloat(lyric[index])" :style="[{'transition-duration':parseFloat(lyric[index + 1 > lyric.length - 1 ? lyric.length - 1 : index  + 1])-parseFloat(lyric[index])+'s'}]" >
                        <p class="animationLyric_p" ref="ppp">{{item[1]}}</p>
                    </span>
                </li>
            </ul>
        </div>
        <div class="setting">
            <ul>
                <li class="iconfont icon-xin1"></li>
                <li class="iconfont icon-xiazai1"></li>
                <li class="iconfont icon-pinglun"></li>
                <li class="iconfont icon-more-vert"></li>
            </ul>
        </div>
        <div class="timeBar ovh">
            <p class="startTime fl">{{currentTime | zhuanhuan}}</p>
            <p class="all_duration fl">
                <span class="duration" @click="goTime($event)">
                    <span class="currentTime" :style="{width:currentTime/duration*100+'%'}"></span>
                </span>
            </p>
            <p class="endTime fl">{{duration | zhuanhuan}}</p>
        </div>
        <div class="controller">
            <ul>
                <li class="iconfont icon-renwu_xh"></li>
                <li class="iconfont icon-previous" @click="goprev"></li>
                <!-- :class="[{'icon-bofang' : addSwithClass},{'icon-pause-20' : !addSwithClass}]" -->
                <li class="iconfont " @click="play_pause" :class="[!addSwithClass == true ? 'icon-bofang' : 'icon-pause-20']"></li>
                <li class="iconfont icon-next" @click="gonext"></li>
                <li class="iconfont icon-icon8" @click="showPopWindowAudioPlay"></li>
            </ul>
        </div>
        <div class="popWindowAudioPlay" v-height :class="{cur:isShowPopWindowAudioPlay}">
            <div class="audioPlayList">
                <div>
                    <span class="iconfont icon-guanbi" @click="close"></span>
                </div>
                <ul>
                    <li v-for="(item, index) in player.album" :class="{cur : index == player.index}" @click="audioPlayListIndex(index)">
                        <p>
                            {{item.musicSinger}} - {{item.musicName}}
                        </p>
                        <span class="iconfont icon-bofang"></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["player"],
    data() {
        return {
            currentTime: 0,
            duration: 0,
            // 添加旋转 和 磁头
            addSwithClass: false,
            isAddSwithClass: true,
            isShowPopWindowAudioPlay: false,
            isNext: true,
            isShowLyric: false,
            lyric: [],
            addClass:false,
            donghuaduration:"0",
            isDuration:false
        }
    },
    computed: {
        index() {
            return this.player.index
        },
        playState() {
            return this.$store.state.playState
        }
    },
    watch: {
        index() {
            var vm = this;
            if (this.player.album[this.index].lyric) {
                $.get(this.player.album[this.index].lyric, function(data) {
                    vm.lyric = vm.parseLyric(data)
                    vm.$nextTick(function(){ 
                        for (var i = 0; i < vm.$refs.ppp.length - 1; i++) { 
                            $(".lyric").each(function(index, el) { 
                                $(el).find(".animationLyric").eq(i).width(vm.$refs.ppp[i].scrollWidth)
                                $(el).find(".animationLyric").eq(i).children('span.animationLyric_oragin').width(vm.$refs.ppp[i].scrollWidth)
                                $(el).find(".animationLyric").eq(i).children('span.animationLyric_oragin').children('p').width(vm.$refs.ppp[i].scrollWidth)
                            });
                        } 
                    })
                })
            }
        }
    },
    mounted(){

    },
    filters: {
        zhuanhuan: function(s) {
            var t;
            if (s > -1) {
                var min = Math.floor(s / 60) % 60;
                var sec = s % 60;
                if (min < 10) { t += "0"; }
                t = min + ":";
                if (sec < 10) { t += "0"; }
                t += ~~sec;
            }
            return t;
        }
    },
    mounted(){ 
        
    },
    methods: {
         
        hideLyric() {
            this.isShowLyric = false
        },
        showLyric() {
            var vm = this;
            this.isShowLyric = true 
            if (this.player.album[this.index].lyric) {
                $.get(this.player.album[this.index].lyric, function(data) {
                    vm.lyric = vm.parseLyric(data)
                    vm.$nextTick(function(){ 
                        for (var i = 0; i < vm.$refs.ppp.length; i++) { 
                            $(".lyric").each(function(index, el) { 
                                $(el).find(".animationLyric").eq(i).width(vm.$refs.ppp[i].scrollWidth)
                                $(el).find(".animationLyric").eq(i).children('span.animationLyric_oragin').width(vm.$refs.ppp[i].scrollWidth)
                                $(el).find(".animationLyric").eq(i).children('span.animationLyric_oragin').children('p').width(vm.$refs.ppp[i].scrollWidth)
                            });
                        } 
                    })
                })
            }
        },
        parseLyric(lyric) {
            // console.log(lyric);
            var lines = lyric.split(/\n/); //去掉换行
            var getLyricTime = /\[\d{2}:\d{2}.\d{2}\]/g //匹配时间
            var arr = []
            while (!getLyricTime.test(lines[0])) {
                lines = lines.splice(1)
                // 得到 有时间的歌词
            }
            if (lines[lines.length - 1].length === 0) {
                lines.pop()
            }
            lines.forEach(function(item) {
                var index = item.indexOf(']');
                var time = item.substr(1, index - 1)
                var timeArr = time.split(":")
                var geci = item.substr(index + 1)
                arr.push([timeArr[0] * 60 + parseFloat(timeArr[1]), geci])
            })
            arr.sort(function(a, b) {
                return a[0] - b[0]
            })
            return arr
        },
        goprev() {
            // 播放上一曲
            this.addSwithClass = true
            if (this.index == 0) {
                this.playIndex(0)
            } else {
                this.playIndex(this.index - 1)
            }
        },
        gonext() {
            // 播放下一曲
            this.addSwithClass = true
            if (this.index >= this.player.album.length - 1) {
                this.playIndex(this.player.album.length - 1)
            } else {
                this.playIndex(this.index + 1)
            }
        },
        goTime(event) {
            // 点击进度条 实现快进快退 
            // 方式 就是点击的位置 / 进度条的总宽 * 当前歌曲的总时间
            $("#audio")[0].currentTime = event.offsetX / $(".duration").width() * this.duration
        },
        playIndex(index) {
            this.addSwithClass = true
            if (this.$store.state.player.playType == 0) {
                this.$store.commit("PLAYAUDIO", {
                    playType: 0,
                    isShowPlayer: true,
                    album: this.player.album,
                    index: index,
                    playerBg: this.player.album[index].playerBg,
                    albumImgSrc: this.player.album[index].albumImgSrc
                })
            } else if (this.$store.state.player.playType == 1) {
                this.$store.commit("PLAYAUDIO", {
                    playType: 1,
                    isShowPlayer: true,
                    album: this.player.album,
                    index: index,
                    playerBg: this.player.playerBg,
                    albumImgSrc: this.player.albumImgSrc
                })
            }
        },
        audioPlayListIndex(index) {
            // 播放器的里面的列表点击事件 使用 0 和 1对 播放专辑 和 热门歌曲做区分
            this.playIndex(index)
        },
        close() {
            // 关闭 播放器里面的 列表
            this.isShowPopWindowAudioPlay = false
        },
        showPopWindowAudioPlay() {
            // 点击显示播放器的 里面的歌曲列表
            // 使用的是 透明度  和z-index 为负数 加类的时候 显示 并将z-index为正数
            this.isShowPopWindowAudioPlay = true
        },
        play_pause() {
            // 点击播放暂停
            var paused = document.getElementById("audio").paused
            if (!paused) {
                document.getElementById("audio").pause();
                this.isAddSwithClass = false
                this.addSwithClass = false
            } else {
                document.getElementById("audio").play();
                this.isAddSwithClass = true
                this.addSwithClass = true
            }
        },
        goBack() {
            this.$store.commit("SHOWORHIDEPLAYER", {
                isShowPlayer: false
            })
        },
        play() {
            var vm = this;
            var currentTime = document.getElementById("audio").currentTime
            var duration = document.getElementById("audio").duration
            var paused = document.getElementById("audio").paused
            var ended = document.getElementById("audio").ended
            // console.log(ended);
            if (ended && this.isNext) {
                this.isNext = false;
                if (this.index == this.player.album.length - 1 && ended) {
                    document.getElementById("audio").pause()
                    this.addSwithClass = false

                } else {
                    this.gonext();
                }
                this.isNext = true;
            }
            // 判断是不是暂停状态
            if (!paused) {
                if (this.isAddSwithClass) {
                    this.isAddSwithClass = false
                    this.addSwithClass = true
                }
            }
            vm.currentTime = currentTime;
            vm.duration = duration;
            for (var p = 0; p < vm.lyric.length - 1; p++) {
                if (vm.currentTime > vm.lyric[p][0] ) {
                    $(".lyric ul").css("top", $(".lyric").height() / 2 - 20 * (p + 1))
                }
            }
        }
    }
}
</script>
