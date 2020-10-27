export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx-wx.getSetting({
          withSubscriptions: true,
          success: (result) => {
              resolve(result)
          },
          fail: (err) => {
              reject(err)
          },
          complete: (res) => {},
        })
    })
}
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx-wx.chooseAddress({
          withSubscriptions: true,
          success: (result) => {
              resolve(result)
          },
          fail: (err) => {
              reject(err)
          },
          complete: (res) => {},
        })
    })
}
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx-wx.openSetting({
          withSubscriptions: true,
          success: (result) => {
              resolve(result)
          },
          fail: (err) => {
              reject(err)
          },
          complete: (res) => {},
        })
    })
}
// promise形式的showModal

export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({  
            content:content,
            showCancel: true,
            title: 'title',
            success: (result) => {
             resolve(result)
            },
            fail: (res) => {
                reject(res)
            },
            complete: (res) => {},
          })
    })
}
export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
       wx.showToast({
         title: title,
         icon:"none",
         success: (result) => {
            resolve(result)
           },
           fail: (res) => {
               reject(res)
           },
       })
    })
}