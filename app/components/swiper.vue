<style scoped lang='stylus'>
	.swiper-container{
		img{
			width: 100%;
		}
	}

</style>
<template>
    <div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in swiperArr">
					<img :src="item.imgUrl" alt="">

               	</div> 
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import Swiper from "../../resource/js/swiper-3.4.2.min.js"
export default {
	props:["swiperArr"],
    data() {
        return {

        }
    },
    mounted() {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: '.swiper-pagination'
        });
    }
}

</script>
