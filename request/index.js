// 同时发送异步代码的次数
let ajaxTimes = 0;

// 封装request
export const request = (params)=>{
  ajaxTimes ++; 
  wx.showLoading({
    title: '加载中',
    mask:true
  });

  // 定义公共的url
  const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve,reject)=>{
    wx-wx.request({
     ...params,
     url:baseURL+params.url,
     success:(result)=>{
      resolve(result);
     }, 
     fail:(err)=>{
      reject(err);
      },
      complete:()=>{
        ajaxTimes--;
        if(ajaxTimes===0){
          wx.hideLoading({});
        }
        
      }
    })

  })
}