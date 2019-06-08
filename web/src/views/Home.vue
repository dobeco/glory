<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

  
    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
      </template>
    </m-list-card>
    <m-card icon="menu1" title="英雄列表"></m-card>
    <m-card icon="menu1" title="精彩视频"></m-card>
    <m-card icon="menu1" title="图文攻略"></m-card>
    <m-card icon="menu1" title="英雄列表"></m-card>
    <m-card icon="menu1" title="英雄列表"></m-card>
    <m-card icon="menu1" title="英雄列表"></m-card>



  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [
        {
          name: "热门",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "热门",
            title: "王者大陆的端午宝藏活动公告",
            date: "06/06"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "新闻",
            title: "夏日新版本“稷下星之队”即将6月上线",
            date: "06/02"
          }))
        },
        {
          name: "公告",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "公告",
            title: "6月2日全服不停机更新公告 惊喜礼不断",
            date: "06/01"
          }))
        },
        {
          name: "活动",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "活动",
            title: "2019KPL春季赛总决赛即将开战 福利活动来助阵",
            date: "06/01"
          }))
        },
        {
          name: "赛事",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "赛事",
            title: "王者荣耀世界冠军杯荣耀来袭，KPL赛区选拔赛谁能突围而出？",
            date: "06/01"
          }))
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
