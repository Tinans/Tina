import navigate from '../navigate/index'
import routeTo from '../navigate/navigateTo'
import eventBus from '../eventBus/index'
import httpRequest from '../axios/index'
import globalData from '../globalProxy/globalData'
import diffData from './diff'
import { watch as globalWatch } from '../observer/watch'

export default function hook (ctx, hookType) {
    const { proxyData } = getApp()
    const weakMap = new WeakMap()

    if (proxyData && proxyData.store) {
        ctx.$store = proxyData.store
    }
	
	if (proxyData && proxyData.api) {
        ctx.$api = proxyData.api
    }

    if (proxyData && proxyData.axios) {
        const { axios } = proxyData
        axios.CancelToken = httpRequest.CancelToken
        axios.graphQL = httpRequest.graphQL
        ctx.$axios = axios
    } else {
        ctx.$axios = httpRequest
    }
    ctx.$bus = eventBus

    if (hookType == 'component') {
        ctx.$route = routeTo
        ctx.$global = globalData

        ctx.routeTo = function (e) {
          return navigate(e)
        }
    }
    
    ctx.$watch = function (fn, cb, op) {
       return globalWatch(ctx, fn, cb, op)
    }

    const { setData, data } = ctx
    ctx._setDataBackup = { setData }
    ctx._rawData = JSON.parse(JSON.stringify(data))
    weakMap.set(ctx._rawData, 'rawData')
	weakMap.set(ctx.$store || {}, 'store')
	weakMap.set(ctx.$bus || {}, 'bus')
	weakMap.set(ctx.$api || {}, 'api')

    ctx.setData = function (data, callback) {
       diffData(ctx, data, callback)
    }
}