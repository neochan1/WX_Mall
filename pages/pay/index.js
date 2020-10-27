// pages/cart/index.js
import { getSetting,chooseAddress,openSetting,showModal,showToast } from "../../utils/asyncWx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    // 获取缓存中的收货地址
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    let cart= wx.getStorageSync('cart')||[];
    cart = cart.filter(v=>v.checked)
    // 计算总价格
    let totalPrice = 0;
    let totalNum  = 0;
    cart.forEach(v=>{
        totalPrice += v.num*v.goods_price;
        totalNum += v.num;
    })
      this.setData({
      address,cart,totalPrice,totalNum
    })
  },
  handleOrderPay(){
    // has token in cache?
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/authorization/index',
      })
      return;
    }
  },
  setCart(cart){
    let allChecked = true;
    // 计算总价格
    let totalPrice = 0;
    let totalNum  = 0;
    cart.forEach(v=>{
        totalPrice += v.num*v.goods_price;
        totalNum += v.num;
    })
    this.setData({
      cart,totalPrice,totalNum
    });
    wx.setStorageSync('cart',cart);
  },

})