import Watcher from './watcher'
import { isObject, noop, strToUpperCase } from '../helper/utils'
import { ctxTarget } from './updateComputed'
let called = false
const watchMap = new Map()

export default function initWatch(ctx, watch) {
  for (let key in watch) {
    let handler = watch[key]

    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(ctx, key, handler[i])
      }
    } else {
      createWatcher(ctx, key, handler)
    }
  }
}

function createWatcher(ctx, fn, cb, options) {
  if (isObject(cb)) {
      options = cb
      cb = cb.handler
  }
  
  if (typeof cb === 'string') {
      if (ctx[cb]) {
          cb = ctx[cb]
      } else {
          cb = noop
      }
  }

  watch(ctx, fn, cb, options)
}

export function watch(ctx, fn, cb, options) {
  if (isObject(cb)) {
      return createWatcher(ctx, fn, cb, options)
  }

  cb = cb || noop
  options = options || {}
  options.user = true
  
  const watcher = new Watcher(ctx, fn, cb, options)
  
  if (options.immediate) {
      cb.call(ctx, watcher.value)
  }

  return function unwatch() {
    watcher.teardown()
  }
}

export function invokeWithWatch(ctx, newVal, oldVal) {
  const ctxMap = ctxTarget()
  const ctxResult = ctxMap.map(item => item.is)
  const current = ctx.vm.is
  const cbName = ctx.cb.name
  const fnName = ctx.fn === cbName ? ctx.fn : `${ctx.fn}${strToUpperCase(cbName)}`

  if (ctxResult.includes(current)) {
      if (watchMap.size) {
          if (watchMap.has(current)) {
              let fnMap = watchMap.get(current)
              if (!fnMap.includes(fnName)) {
                  fnMap.push(fnName)
                  ctx.cb.call(ctx.vm, newVal, oldVal)
              }
          } else {
              const funcNames = []
              funcNames.push(fnName)
              watchMap.set(current, funcNames)
              ctx.cb.call(ctx.vm, newVal, oldVal)
          }
      } else {
          const funcList = []
          funcList.push(fnName)
          watchMap.set(current, funcList)
          ctx.cb.call(ctx.vm, newVal, oldVal)
      }
  }

  if (!called) {
      wx.nextTick(() => {
         watchMap.clear()
         called = false
      })

      called = true
  }
}