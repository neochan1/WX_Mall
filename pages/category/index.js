import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList:[],
    // 右侧的商品数据
    rightContent:[],
    //点击被选中的左侧菜单
    currentIndex:0,
    // 右侧内容的滚动条距离顶部距离
    scrollTop:0
  },
  // 接口返回的数据
  Cates:[],
  // 右侧内容的滚动条

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 分类缓存处理
    /**
     * 1.先判断本地存储中有没有旧的数据
     * 2.如果没有旧的数据直接发送新的请求
     * 3.若果有旧数据并且旧数据没有过期 使用本地存储的旧数据即可
     */
    // this.getCates();
    // 1.获取本地存储的数据
    const Cates = wx.getStorageSync('cates');
    // 2.判断
    if(!Cates){
      this.getCates();
    }else{
      // 有旧数据 判断有没有过期
      if(Date.now()-Cates.time>1000*5){
        this.getCates();
      }else{
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,rightContent
        })       
      }
    }
  },
/**
 * 获取分类的接口数据
 */
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res=>{
    //   this.Cates = res.data.message;
    //   // 把数据存储到本地存储中
    //   wx-wx.setStorage({
    //     data: {time:Date.now(),data:this.Cates},
    //     key: "cates",
    //     success: (res) => {},
    //     fail: (res) => {},
    //     complete: (res) => {},
    //   })
    //   // 构造左侧大菜单数据
    //   let leftMenuList = this.Cates.map(v=>v.cat_name);
    //   // 构造右侧商品数据
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,rightContent
    //   })
    // })
    const res =  await(request({
      url:"/categories"
    }));
    this.Cates = res.data.message;
      // 把数据存储到本地存储中
      wx-wx.setStorage({
        data: {time:Date.now(),data:this.Cates},
        key: "cates",
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
      // 构造左侧大菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      // 构造右侧商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,rightContent
      })
  },
  // 左侧菜单的点击事件
  handleItemTap(e){
    // console.log(e);
    // 获取被点击事件的索引，之后给data中currentIndex赋值 根据不同的索引渲染右侧商品的内容
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  }
})