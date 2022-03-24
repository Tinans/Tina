### Tina - 微信小程序全局响应式状态管理器解决方案

  

#### 前言
小程序开发有时难免也会遇到复杂的业务场景，如跨页面的数据传递，非父子组件的数据同步，多个子孙组件的数据复用等等，此时globalData或者triggerEvent/selectComponent已经无法很好地提供支持，相反，它们会导致业务逻辑代码和模板代码迅速膨胀到难以阅读和维护，同时也容易产生难以追踪的bug隐患,成熟的前端框架都有对应的数据管理器便于数据进行管理,Tina的功能是让小程序拥有vuex一样的功能,让小程序的数据能够进行模块化管理,全组件全页面响应式且可以使用computed及watch功能

#### 特别说明
由于Tina的组件实例是在Component构造器上进行扩展和封装,有赞的vant-ui的组件也是在Component构造器上进行扩展和封装,两者在同一项目中使用会造成冲突,这一点要特别注意

#### 安装

方式一: 通过 npm 安装 (推荐)
```
//在项目根目录下初始化
npm init -y

//安装tina-weapp
npm install tina-weapp

//构建
在开发者工具中: 工具 ---> 构建npm
```

#### 方式二: 下载代码
直接通过 git 下载 tina-weapp 源代码，并将lib下的目录文件放在项目根目录下

```
git clone https://github.com/Tinans/Tina
```

#### 使用Store

```
import { Store } from 'tina-weapp'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

export default new Store ({
  modules: {
    app,
    user
  },
  getters
})

```
#### 引入store配置文件
请在app.js中放在proxyData中,如下示例
```
// app.js
import store from './store/index'

App({
  proxyData: {
    store
  },
  onLaunch() {
    
  },
  globalData: {
    
  }
})
```

#### 在页面或者组件中使用store
通vue一样可以通过computed使用或者直接获取,在页面跟组件的使用方式一样
```
// pages/home/index.js
import { mapState, mapGetters } from 'tina-weapp'

Page({
  data: {
    num: 50
  },
  onLoad() {
     let count = this.$store.state.user.count
     this.setData({ totalCount: count })
  },
  computed: {
    count: we => we.$store.state.user.count,
    total() {
      return this.data.count + 50
    },
    ...mapState('user', {
      userInfo: state => state.userInfo
    }),
    ...mapGetters(["doubleNumber"]),
    ...mapGetters('user', {
      doubleCount: 'doubleCount'
    }),
  }
})
```

#### 使用axios
简介: 在小程序axios使用, 使用方式跟[axios官方文档](http://www.axios-js.com/zh-cn/docs/)一样,支持请求拦截,响应拦截,取消请求,headers配置,添加 authKey,配置默认config等,在Tina中使用如下:

配置拦截

```
import { axios } from 'tina-weapp'

const instance = axios.create({
    baseURL: 'https://www.test.com/api/',
    timeout: 10000
})

//请求拦截
instance.interceptors.request.use(
    config => {
        config.headers['token'] = 'myToken'
        return config
    },
    error => {
        console.error(error)
        return Promise.reject(error)
    }
)

//响应拦截
instance.interceptors.response.use(
    response => {
       if (response.data.code == 1) {
           console.log(response.data.msg)
       }
       return response
    },
    error => {
        console.warn(error)
        return Promise.reject(error)
    }
)

export default instance
```


#### 引入配置文件 
如若添加拦截配置,请在app.js中重新引入并放在proxyData中,如下示例
```
// app.js

//你的拦截配置文件
import axios from './config/request/index'

App({
  proxyData: {
    axios
  }
})
```
在页面中或组件中使用axios
```
  // pages/home/index.js

  getData: function() {
    this.$axios({
      url: 'user/banner',
    }).then(res => {
      console.log('data', res.data)
    }).catch(err => console.log('err', err))

    const CancelToken = this.$axios.CancelToken
    let cancel
    const source = CancelToken.source()

    //取消请求方式一
    this.$axios.get('user/banner', {
        cancelToken: source.token,
      }).then(res => {
       console.log('data', res.data)
    }).catch(err => console.log('err', err))
    source.cancel('测试取消请求')

    //取消请求方式二
    this.$axios.get('user/banner', {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c
        })
      }).then(res => {
      console.log('data', res.data)
    }).catch(err => console.log('err', err))
    cancel('主动取消请求')
  },
```

#### 使用computed, watch
computed及watch使用,使用方法跟在vue中使用是一样的
```
// pages/home/index.js
import { mapState, mapGetters } from 'tina-weapp'

Page({
  data: {
    num: 50
  },
  onLoad() {
    let unwatch = this.$watch('total', function (value) {
      console.log('total', value)
    }, { immediate: true })

    unwatch()
  },
  computed: {
    count: we => we.$store.state.user.count,
    total() {
      return this.data.count + 50
    },
    ...mapState('user', {
      userInfo: state => state.userInfo
    }),
    ...mapGetters(["doubleNumber"]),
    ...mapGetters('user', {
      doubleCount: 'doubleCount'
    }),
  },
  watch: {
    count: function (newVal, oldVal) {
      console.log('newVal', newVal, 'oldVal', oldVal)
    },
    num: function (newVal, oldVal) {
      console.log('newVal', newVal, 'oldVal', oldVal)
    },
    total: 'doSomething',
    doubleCount: [
      function handle1 (val, oldVal) { console.log('111111') },
      function handle2 (val, oldVal) { console.log('222222', val, oldVal) }
    ],
    userInfo: {
      handler(a, b) {
         console.log('新值', a, '旧值', b)
      },
      deep: true,
      immediate: true
    }
  },

  doSomething(x, y) {
    console.log(`watching, ${x}, ${y}`)
  },
})
```
#### 使用全局自定义方法
Tina提供了一些全局方法,方便开发者全局(页面组件均可)调用
1.  routeTo方法: routeTo方法是一个全局方法,若写在标签上可直接跳转(不用在js里写跳转方法),要写跳转路径url,跳转类型可写可不写,不写默认是navigateTo方式跳转,若是其他方式跳转可参考以下代码:
```html
<view class="wrap">
  <view class="title" style="margin: 30px 0 20px;">全局router使用示例</view>
  <button class="btn" data-url="/pages/about/index?id=100&name=jerry" bindtap="routeTo">navigateTo跳转</button>
  <button class="btn" data-route-type="switchTab" data-url="/pages/mine/index" bindtap="routeTo">switchTab跳转</button>
  <button class="btn" data-route-type="redirectTo" data-url="/pages/about/index" bindtap="routeTo">redirectTo跳转</button>
  <button class="btn" data-route-type="reLaunch" data-url="/pages/about/index" bindtap="routeTo">reLaunch跳转</button>
   <view class="title" style="margin: 30px 0 20px;">全局route带参跳转</view>
  <button class="btn" bindtap="navigateTo">navigateTo全局带参跳转</button>
  <button class="btn" data-type="redirectTo" bindtap="navigateTo">redirectTo全局带参跳转</button>
  <button class="btn" data-type="reLaunch" bindtap="navigateTo">reLaunch全局带参跳转</button>
</view>

 // pages/home/index.js

  /**
   * routeTo使用示例
   */
  navigateTo(e) {
    const { type } = e.currentTarget.dataset
    
    const params = {
      id: 10,
      price: 99,
      count: 2,
      weight: '50kg'
    }

    if (type) {
        this.$route('/pages/mine/index', type, params)
    } else {
        this.$route('/pages/mine/index', params)
    }
  }
```
2. eventBus事件总线:
```
//添加事件侦听
this.$bus.on('add', this.sum)

//调用事件回调
this.$bus.emit('add', 50, 60)

//只添加一次侦听
this.$bus.once('add', this.sum)

//移除事件侦听
this.$bus.off('add', this.sum)
```

3. 获取和修改globalData内的数据:
```
// app.js
App({
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

// pages/home/index.js

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
  //获取
  const global = this.$global()
  const time = this.$global('date')
  let info = this.$global('bookInfo.info')
  let bookName = this.$global('bookList[0].bookName')
    
  //修改
  this.$global('bookList[0].bookName', '乱世佳人')
  this.$global('bookList[0].title', '飘')
  this.$global('bookInfo.info.author', 'unknow')
},
```

#### JSON Diff

其diff原理参考使用了westore [JSON Diff](https://github.com/Tencent/westore/blob/master/packages/westore/utils/diff.js)

原生小程序常见的setData操作错误[参考官方说法](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html):
1. 频繁的去 setData
2. 每次 setData 都传递大量新数据
3. 后台态页面进行 setData

JSON Diff的效果如下:
```
    const data = [
      {
        id: '10001',
        name: 'aaa'
      },
      {
        id: '10002',
        name: 'bbb'
      },
      {
        id: '10003',
        name: 'ccc'
      }
    ]

    const newData = [
      {
        id: '10001',
        name: 'aaa',
        age: 20
      },
      {
        id: '10002',
        name: 'bbb'
      },
      {
        id: '10003',
        name: 'ccc'
      },
      {
        id: '10004',
        name: 'eee'
      },
      {
        id: '10005',
        name: 'fff'
      },
      {
        id: '10006',
        name: 'ttt'
      }
    ]

    const diffResult = diffData(data, newData)
    //diff之后如下
    {
      'data[0].age': 20,
      'data[4].id': '10004',
      'data[4].name': 'eee',
      'data[5].id': '10005',
      'data[5].name': 'fff',
      'data[6].id': '10006',
      'data[5].name': 'ttt'
    }
```


小程序setData的数据在JSON.stringify后超过1MB引起页面卡顿非常明显,而且官方也说明一次性setData的量不能太多,最理想的条件是setData的数据在JSON.stringify后不超过 256KB,小程序的渲染层和逻辑层分别由2个线程管理：渲染层的界面使用了WebView 进行渲染；逻辑层采用JsCore线程运行JS脚本。一个小程序存在多个界面，所以渲染层存在多个WebView线程，这两个线程的通信会经由微信客户端做中转，逻辑层发送网络请求也经由微信客户端转发,而遇到长列表渲染时非常棘手,长列表通常通过分页加载,一般处理分页我们是通过将原来的数据和最新一页的数据进行合并后setData,当加载到第100页时要setData一百页的数据,这个数据量非常大会引起页面卡顿甚至卡死。在Tina中经过JSON Diff后,取的是setData前后的差量数据,加载到第一百页,setData的数据也只是第一百页的数据,这样就可以达到优化setData效果


