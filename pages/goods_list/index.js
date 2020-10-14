// pages/goods_list/index.js
// 用户上滑页面 滚动条触底 开始加载下一页数据
import {request} from "../../request/index"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    tabs:[{
      id:0,
      title:"综合",
      isActive:true
    },{
      id:1,
      title:"销量",
      isActive:false
    },{
      id:2,
      title:"价格",
      isActive:false
    },]
   
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10,
  },
  // 总页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams});
    const total = res.data.message.total
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    // console.log(this.totalPages);
    
    this.setData({
      // 拼接了数组
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    });
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh({
      success: (res) => {"ok"},
    })
    console.log(res);
    
  },
  // 标题点击事件
  handleTabsItemChange(e){
    // console.log(e)
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    // 1.重置数组
    this.setData({
      goodsList:[]
    })
    // 2.重置页码
    this.QueryParams.pagenum = 1;
    // 3.重新发送请求
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 1.判断是否还有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有更多数据了!',
      })
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})