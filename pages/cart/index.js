// pages/cart/index.js
import { getSetting,chooseAddress,openSetting,showModal,showToast } from "../../utils/asyncWx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    // 获取缓存中的收货地址
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart')||[];
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    let allChecked = true;
    // 计算总价格
    let totalPrice = 0;
    let totalNum  = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num*v.goods_price;
        totalNum += v.num;
      }else{
        allChecked=false;
      }
    })
    allChecked=cart.length!=0?allChecked:false;
      this.setData({
      address:address,cart,allChecked,totalPrice,totalNum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 添加收货地址事件
 
  async handleAddAdress(){
    // 获取用户地址
    try {
   const res1 = await getSetting();
   const scopeAddress = res1.authSetting["scope.address"]
   if(scopeAddress===false){
    await openSetting();
   }else{  
     const address=  await chooseAddress();
     console.log(address);   
      wx.setStorageSync('address', address);
   }
 } catch (error) {
   console.log(error);  
 }
  },
  // 商品的选中事件
  handleItemChange(e){
    // 获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id;
    console.log(goods_id);
    // get cart array
    const {cart} = this.data;
    // find goods which need to modify
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    // anti-checked
    cart[index].checked = !cart[index].checked;
    // set cart.dataset to data and cache
    this.setCart(cart);
  },
  setCart(cart){
    let allChecked = true;
    // 计算总价格
    let totalPrice = 0;
    let totalNum  = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num*v.goods_price;
        totalNum += v.num;
      }else{
        allChecked=false;
      }
    })
    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      cart,totalPrice,totalNum,allChecked
    });
    wx.setStorageSync('cart',cart);
  },
  //  购物车全选反选
  handleItemAllCheck(){
    let {cart,allChecked} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  // 商品数量编辑
  async handleItemNumEdit(e){

    // get goods_id
    const {operation,id} = e.currentTarget.dataset;
    console.log(operation,id)
    // get cart array
    let {cart} = this.data;
    // find index of goods which need to modify
    const index = cart.findIndex(v=>v.goods_id===id);
    // modify number
    if(cart[index].num===1&&operation===-1){
      const res = await showModal({content:"确定删除该商品吗？"});
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart)
      }
    }else{
      cart[index].num+=operation;
      this.setCart(cart);
    }
  },
  // 商品结算
 async handlePay(){
    // has address?
    const {address} = this.data;
    if(!address.userName){
      await showToast({title:"请先选择收货地址"})
      return;
    }
    // has goods in cart?
    const {totalNum} = this.data;
    if(totalNum===0){
      await showToast({title:"请先选购商品"})
      return;
    }
    //jump to paypage
    wx.navigateTo({
      url:'/pages/pay/index',
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