import initState from '../observer/index'
import initWatch from '../observer/watch'
import linkTo from '../navigate/index'
import route from '../navigate/navigateTo'
import globalData from './globalData'
import { updateComputed } from '../observer/updateComputed'
import handleData from '../helper/handleData'
import { ctxTarget } from '../observer/updateComputed'
import handleHook from '../helper/handleHook'

const originalPage = Page

export default Page = function (options = {}) {
  options.$global = globalData
  options.$route = route

  const lifeTimesBackup = {
    onLoad: options.onLoad,
    onShow: options.onShow,
    onHide: options.onHide,
    onUnload: options.onUnload
  }

  options.onLoad = function (config) {
    handleHook(this)
    const { data, computed } = this
    initState(this, data, computed)
    
    wx.nextTick(() => {
       handleData(this)
    })

    lifeTimesBackup.onLoad && lifeTimesBackup.onLoad.call(this, config)
  }

  options.onShow = function () {
    initWatch(this, this.watch)
    updateComputed('updateComputed')
    lifeTimesBackup.onShow && lifeTimesBackup.onShow.call(this)
  }

  options.onHide = function () {
    const ctxResult = ctxTarget()
    ctxResult.map(ctx => {
       ctx._rawBackup = ctx._rawData
       ctx._rawStr = JSON.stringify(ctx._rawData)
    })
    
    lifeTimesBackup.onHide && lifeTimesBackup.onHide.call(this)
  }

  options.onUnload = function () {
    const computedWatchers = this._computedWatchers
    if (computedWatchers && Object.keys(computedWatchers).length) {
        Object.keys(computedWatchers).forEach(key => computedWatchers[key].teardown())
    }

    this._rawData = null
    this._computedWatchers = null
    this.$store = null
    this.$bus = null

    lifeTimesBackup.onUnload && lifeTimesBackup.onUnload.call(this)
  }

  options.routeTo = function (e) {
    return linkTo(e)
  }

  return originalPage(options)
}