// pages/authorization/index.js
import {request} from "../../request/index"

Page({
  async handleGetUserInfo(e){
    const {encryptedData,rawData,iv,signature} = e.detail;
    
    wx.login({
      timeout: 1000,
      success:(res)=>{
       const {code}= res;
      //  console.log(res);
       
      //  console.log(code);
      const loginParams = {encryptedData,rawData,iv,signature,code}
      // console.log(loginParams);
      
      const res1 =  request({url:"/users/wxlogin",data:loginParams,method:"POST"})
      console.log(res1);    
      }
    })
    
  },
})