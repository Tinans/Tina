export default class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function')
    }

    let resolvePromise = null
    this.promise = new Promise(resolve => {
      resolvePromise = resolve
    })
    executor(message => {
      if (this.reason) return
      this.reason = message  ? `Cancel: ${message}` : 'Canceled'
      resolvePromise(this.reason)
    })
  }
}

CancelToken.source = function source() {
  let cancel
  let token = new CancelToken(function executor(c) {
    cancel = c
  })
  
  return {
    token,
    cancel
  }
}