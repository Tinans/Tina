export function noop () {}

let unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
let bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"))
export function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    if (obj && obj.data) {
        let { data } = obj
        for (var i = 0; i < segments.length; i++) {
        data = data[segments[i]]
      }

      return data
    }

    return obj
  }
}

export function equal(a, b) {
  if (a === b) return true

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = Array.isArray(a),
        arrB = Array.isArray(b),
        i,
        length,
        key

    if (arrA && arrB) {
      length = a.length
      if (length != b.length) return false
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false
      return true
    }

    if (arrA != arrB) return false

    var dateA = a instanceof Date,
        dateB = b instanceof Date
    if (dateA != dateB) return false
    if (dateA && dateB) return a.getTime() == b.getTime()

    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp
        
    if (regexpA != regexpB) return false
    if (regexpA && regexpB) return a.toString() == b.toString()

    var keys = Object.keys(a)
    length = keys.length

    if (length !== Object.keys(b).length)
      return false

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false

    for (i = length; i-- !== 0;) {
      key = keys[i]
      if (!equal(a[key], b[key])) return false
    }

    return true
  }

  return a!==a && b!==b
}

export function isPlainObject (obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}

export function isMixinObject (value) {
  return Object.prototype.toString.call(value) === "[object Object]" || Array.isArray(value)
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function strToUpperCase (str) {  
  return str.toLowerCase().replace(/bound/g, '').replace(/^\s+/g, '').replace(/(?:^)\w/g, c => c.toUpperCase()) 
}

export function isEmptyObject (obj) {
  if (!obj) {
    return true
  }
  for (let key in obj) {
    return false
  }
  return true
}

export function isNotEmptyObject (obj) {
  return obj !== null && typeof obj === 'object' && Object.keys(obj).length
}

export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function once () {
   let called = false
   return (fn) => {
      if (!called) {
          called = true
          typeof fn === 'function' && fn()
      }
   }
}

export function asyncLock () {
  let lock = false
  return (fn, onerror) => {
    if (!lock) {
      lock = true
      Promise.resolve().then(() => {
        lock = false
        typeof fn === 'function' && fn()
      }).catch(e => {
        lock = false
        typeof onerror === 'function' && onerror()
        console.error('Something wrong in weapp asyncLock func execution, please check.', undefined, e)
      })
    }
  }
}

export function getObjByKey (obj) {
  const result = {}
  Object.keys(obj).forEach(key => {
      const keys = key.split('.')

      if (keys.length > 1) {
          if (obj[key] === null) {
              result[key] = ''
          } else {
              result[key] = obj[key]
          }
      } else {
          if (obj[key] !== null) {
              result[key] = obj[key]
          }
      }
  })

  return result
}

export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function forEachMutation (module, fn) {
  if (module._rawModule.mutations) {
    forEachValue(module._rawModule.mutations, fn)
  }
}

export function forEachAction (module, fn) {
  if (module._rawModule.actions) {
    forEachValue(module._rawModule.actions, fn)
  }
}

export function forEachChild (module, fn) {
  forEachValue(module._children, fn)
}

export function forEachGetter (module, fn) {
  if (module._rawModule.getters) {
    forEachValue(module._rawModule.getters, fn)
  }
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}

export function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

export function getNestedState (state, path) {
  return path.reduce((state, key) => state[key], state)
}

export function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload
    payload = type
    type = type.type
  }

  return { type, payload, options }
}

export function getNamespace(root, path) { 
  let rootModule = root
  return path.reduce((namespace, key) => {
    rootModule = rootModule._children[key]
    return namespace + (rootModule._rawModule.namespaced ? key + '/' : '')
  }, '')
}