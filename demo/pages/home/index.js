// pages/home/index.js
import { mapState, mapGetters } from 'tina-weapp'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 50,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const time = this.$global('date')
    console.log('time', time)

    let unwatch = this.$watch('total', function (value) {
      console.log('total', value)
    }, { immediate: true })

    unwatch()

    this.$bus.on('add', this.sum)
    // this.getData()
  },

  getData: function() {
    this.$axios({
      url: this.$api.banner,
    }).then(res => {
      console.log('data', res.data)
    }).catch(err => console.log('err', err))

    const CancelToken = this.$axios.CancelToken
    let cancel
    const source = CancelToken.source()

    //取消请求方式一
    this.$axios.get(this.$api.banner, {
        cancelToken: source.token,
      }).then(res => {
       console.log('data', res.data)
    }).catch(err => console.log('err', err))
    source.cancel('测试取消请求')

    //取消请求方式二
    this.$axios.get(this.$api.banner, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c
        })
      }).then(res => {
      console.log('data', res.data)
    }).catch(err => console.log('err', err))
    cancel('主动取消请求')

  },

  sum: function(a, b) {
    console.log('sum', a + b)
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
    total: 'doSomething'
  },

  doSomething(x, y) {
    console.log(`watching, ${x}, ${y}`)
  },

  change: function() {
    const data = {
      name: 'jackson',
      age: 20,
      other: {
         favorite: 'play games'
      }
    }

    this.$store.commit('user/SET_USER_INFO', data)
    this.$store.commit('user/SET_COUNT', 200)
  },

  getGlobalData: function() {
    console.log('globalData', this.$global())
    let bookInfo = this.$global('bookInfo')
    let info = this.$global('bookInfo.info')
    console.log(info, bookInfo, this.$global('bookList[0].bookName'))
  },

  changeGlobalData: function() {
    this.$global('bookList[0].bookName', '乱世佳人')
    this.$global('bookList[0].title', '飘')
    this.$global('bookInfo.info.author', 'unknow')
    console.log('globalData', this.$global())
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