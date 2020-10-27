import {request} from "../../request/index"

// pages/goods_detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false,
  },
  GoodsInfo:{}, 
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1]
    let options = currentPage.options;  
    const {goods_id} = options;  
    this.getGoodsDetail(goods_id);
  },
  handleCollect(){
    let isCollect = false;
    let collect = wx.getStorageSync('collect')||[];
    let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index!==-1){
      collect.splice(index,1);
      isCollect=false
      wx.showToast({
        title: '取消成功',
        icon:"success"
      })
    }else{
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon:"success"
      })     
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    })
  },
  // 获取商品详情的数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo = goodsObj.data.message;
    let collect = wx.getStorageSync('collect')||[];
    let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
    console.log(goodsObj);
    this.setData({
      goodsObj:{
        goods_name:goodsObj.data.message.goods_name,
        goods_price:goodsObj.data.message.goods_price,
        goods_introduce:goodsObj.data.message.goods_introduce.replace(/\.webp/g,".jpg"),
        pics:goodsObj.data.message.pics
      },isCollect
    })
   },
// 预览商品详情
  handlePreviewImage(e){
    const current = e.currentTarget.dataset.url;
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
    // console.log(urls);
    wx-wx.previewImage({
      // 1.构造需要预览的图片数组
      urls,
      current
    })  
  },
  // 加入购物车时间处理
  handleCartAdd(){
    // 1.获取缓存中的购物车的数组
    let cart = wx.getStorageSync('cart')||[];
    // 2 判断商品数据是否存在于购物车数组中
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    // console.log(this.GoodsInfo.goods_id,index)
    if(index===-1){
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})