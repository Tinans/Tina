// pages/mine/index.js
import { mapState } from 'tina-weapp'
const mixins = require('../../mixins/index')

Page({
  behaviors: [mixins],
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  change: function () {
    const userInfo = {
      name: 'Bill Gates',
      age: 26,
    }

    this.login(userInfo)
  },

  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo
    }),
  },

  navigateTo(e) {
    let { type } = e.currentTarget.dataset
    
    const params = {
      id: 10,
      price: 99,
      count: 2,
      weight: '50kg'
    }

    if (type) {
        this.$route('/pages/about/index', type, params)
    } else {
        this.$route('/pages/about/index', params)
    }
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