// app.js
import store from './store/index'
import axios from './config/request/index'
import api from './config/api/index'

App({
  proxyData: {
    store,
    axios,
    api
  },
  onLaunch() {
    
  },
  globalData: {
    date: '2020-01-01',
    bookList: [
      {
        bookName: 'Gone with the wind',
        info: {
          author: 'Margaret Mitchell',
        }
      }
    ],
    bookInfo: {
       bookName: 'Gone with the wind',
       info: {
         author: 'Margaret Mitchell',
       }
    }
  }
})
