import { isPlainObject } from '../helper/utils'

export default function routeTo (...args) {
  let url = args[0], type = 'navigateTo', params= {}

  if (args.length == 2) {
    if (isPlainObject(args[1])) {
        params = args[1]
    }

    if (typeof args[1] == "string") {
        type = args[1]
    }
  }

  if (args.length == 3) {
      type = args[1]
      params = isPlainObject(args[2]) ? args[2] : {}
  } 
  
  if (type == 'navigateBack') {
      try {
        wx.navigateBack(params)
      } catch (e) {
        console.error(e)
      }
  } else {
    if (!url) {
        throw Error('The url should be string and not empty')
    }
   
   const typeArray =  ['navigateTo', 'reLaunch', 'redirectTo']
   if (typeArray.includes(type)) {  //可以传参的跳转方式
       if (Object.keys(params).length) {  //带参数
         for (const [key, value] of Object.entries(params)) {
           if (url.indexOf('?') > 0) {
               url += `&${key}=${value}`
            } else {
               url += `?${key}=${value}`
            }
         }
       }
 
       navigateTo(url, type)
   } else {
       try {
         let index = url.indexOf('?')
         let route = index > 0 ? url.substring(0, index) : url
         wx.switchTab({ url: route })
       } catch (err) {
         console.error(err)
       }
    }
  }
}

function navigateTo (url, type) {
  if (type == 'navigateTo') {
      wx.navigateTo({ url })
  } else if (type == 'reLaunch') {
      wx.reLaunch({ url })
  } else {
      wx.redirectTo({ url })
  }
}