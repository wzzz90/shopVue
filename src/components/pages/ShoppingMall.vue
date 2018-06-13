
<template>
  <div>
<!--search bar layout-->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3" class="icon-container">
          <i class="location-icon"></i>
<!--          <img :src="locationIcon" width="80%" class="location-icon" />-->
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input"/>
        </van-col>
        <van-col span="5">
          <van-button size="mini" class="btn">查找</van-button>
        </van-col>
      </van-row>
    </div>
    
    <!--swipwer area-->
    <div class="swiper-area">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                <img :src="banner.image" width="100%"/>
            </van-swipe-item>
        </van-swipe>
    </div>
    

    <div class="type-bar">
        <div  v-for="(cate,index) in category" :key="index" >
                <img v-lazy="cate.image" width="90%" />
                <span>{{cate.mallCategoryName}}</span> 
        </div>
    </div>

    <!--AD banner area-->
    <div class="banner">
        <img :src="adBanner.PICTURE_ADDRESS" width="100%"/>
    </div>

    <!--Recommend goods area-->
    <div class="recommend-area">
        <div class="recommend-title">
            商品推荐
        </div>
        <div class="recommend-body">
          <div class="recommend-item" v-for="(item ,index) in recommendGoods" :key="index">
            
                <img :src="item.image" width="80%" />
<!--                <div>{{item.goodsName}}</div>-->
                <p class="price">￥{{item.price | moneyFilter}}</p>
                <strike class="mall-price">￥{{item.mallPrice | moneyFilter}}</strike>
                
          </div>
<!--          <swiperDefault></swiperDefault>   -->        
        </div>
    </div>
    
    

    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    
    

    <!--Hot Area-->
    <div class="hot-area">
        <div class="hot-title">热卖商品</div>
        <div class="hot-goods">
            <van-list>
              <van-row gutter="20">
                  <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                      <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                  </van-col>
              </van-row>
            </van-list>
        </div>
    </div>

  </div>
</template>

<script>
  
import swiperDefault from '../swiper/swiperDefault'
import floorComponent from '../floorComponent'
import goodsInfo from '../goodsInfoComponent'
import {toMoney} from '@/filter/moneyFilter.js'
import URLAPI from '@/serviceAPI.config.js'

export default {
    data() {
      return {
        locationIcon: require('../../assets/images/logo.png'),
        adBanner: {},
        bannerPicArray:[],
        category: [],
        recommendGoods: [], 
        floor1:[],         //楼层1的数据
        floor2:[],         //楼层1的数据
        floor3:[],         //楼层1的数据
        floorName:{},
        hotGoods:[] //热卖商品
      }
    },
    
    //定义这个sweiper对象  
    computed: {   
    },   
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }  
    },
    
    components: {
      swiperDefault,
      floorComponent,
      goodsInfo
    },
    
    mounted() {
      this.loadData()
    },
    
    methods: {
      async loadData() {
        let res;
        try{
        	res = await this.$http.get(URLAPI.getShoppingMallInfo)
        	console.log(res.data)
        	this.category = res.data.data.category
        	this.adBanner = res.data.data.advertesPicture //获得广告图片
        	this.bannerPicArray = res.data.data.slides   //轮播图片
        	this.recommendGoods = res.data.data.recommend  //推荐商品           //楼层1数据
          this.floorName = res.data.data.floorName        //楼层名称
          this.floor1 = res.data.data.floor1              //楼层1数据
          this.floor2 = res.data.data.floor2              //楼层2数据
          this.floor3 = res.data.data.floor3 
          this.hotGoods = res.data.data.hotGoods           //热卖商品
        }catch(e){
        	//TODO handle the exception
        }
      }
    }
}
</script>

<style lang="less" scoped>
  .search-bar{
      height: 4.5rem;
      background-color: #e5017d;
      line-height: 4.5rem;
      .icon-container {
        display: flex;
        align-items: center;
        height: 4.5rem;
      }
      .search-input{
          width:100%;
          height: 2rem;
          border: none;
          border-bottom: 1px solid #fff;
          background-color: #e5017d;
          color:#fff;
      }
      .btn {
        color: #fff;
        background-color: rgba(0,0,0,0);
        border: none;
      }
      .btn:active::before {
        background: rgba(0,0,0,0) !important;
      }
      .location-icon{
        font-style: normal;
        display: inline-block;
        height: 2.2rem;
        width: 100%;
        background: url(../../assets/images/logo.png) no-repeat;
        background-size: contain;
        background-position: center;
      }

  }
  .swiper-area{
    width: 100%;
    clear: both;
    overflow: hidden;
  }
  .banner {
    padding: 1rem;
    background: rgb(239,239,239);
  }
  .type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
      div{
        padding: .3rem;
        font-size: 12px;
        text-align: center;
      }
  }
  .recommend-area{
    background-color: #fff;
    margin-top: .3rem;
    .recommend-title{
        border-bottom:1px solid #eee;
        font-size:1.4rem;
        padding:.2rem;
        color:#e5017d;
    }
    .recommend-body{
      border-bottom: 1px solid #eee;
      display: flex;
      padding: 1rem 0;
      .recommend-item{
        width:99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
        .price {
          font-size: 1.6rem;
        }
        strike {
          color: #b2b2b2;;
        }
      }
    }
  }
  
  .hot-area{
      text-align: center;
      font-size:1.4rem;
      height: 1.8rem;
      line-height:1.8rem;
    .hot-title {
      height: 1.8rem;
      line-height: 1.8rem;
      padding: 1rem 0;
      background: rgb(239,239,239);
    }
  }
  
  

</style>