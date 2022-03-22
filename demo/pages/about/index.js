// pages/about/index.js
import { mapState } from 'tina-weapp'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log('options', options)
     this.$bus.emit('add', 50, 30)
  },

  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo,
      count: state => state.count,
    }),
  },

  sumit() {
    const data = {
      name: 'jerry',
      age: 25,
      other: {
         favorite: 'play basketball'
      }
    }

    this.$store.commit('user/SET_COUNT', 500)
    this.$store.dispatch('user/LOGIN', data)
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