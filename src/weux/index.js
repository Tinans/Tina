import ModuleCollection from './moduleCollection'
import reactive from '../observer/reactive'
import { 
  isPromise, 
  getNestedState, 
  unifyObjectStyle, 
  forEachValue, 
  forEachChild,
  forEachMutation,
  forEachAction,
  forEachGetter,
  isObject, 
  getNamespace
} from '../helper/utils'

class Store {
  constructor (options = {}) {
    this._init = false
    this._actions = {}
    this._mutations = {}
    this._wrappedGetters = {}
    this._makeLocalGettersCache = {}
    this._modulesNamespaceMap = {}
    this._modules = new ModuleCollection(options)
    const state = this._states = this._modules.root.state
    this._rawState = JSON.parse(JSON.stringify(state))

    const store = this
    const { dispatch, commit } = this

    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }

    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }
    
    installModule(this, state, [], this._modules.root)
    resetStoreGetter(this, state)
  }

  commit (type, payload) {
    if (isObject(type) && type.type) {
      payload = type
      type = type.type
    }
    
    const entry = this._mutations[type]
    if (!entry) {
      console.error(`[weux] unknown mutation type: ${type}`)
      return
    }
    entry.forEach(handler => handler(payload))
  }

  dispatch (type, payload) {
    if (isObject(type) && type.type) {
      payload = type
      type = type.type
    }

    const entry = this._actions[type]
    if (!entry) {
      console.error(`[weux] unknown action type: ${type}`)
      return
    }
    return entry.length > 1
      ? Promise.all(entry.map(handler => handler(payload)))
      : entry[0](payload)
  }

  get state() {
    if (!this._init) {
      reactive(this._states)
      this._init = true
    }

    return this._states
  }

  set state (val) {
    console.error(`use store commit to explicit replace store state.`)
  }
}

function resetStoreGetter (store, state) {
  let { getters } = store._modules.root._rawModule
  getters = getters || {}
  
  store.getters = {}
  store._getters = {}
  store._makeLocalGettersCache = Object.create(null)
  const wrappedGetters = store._wrappedGetters

  forEachValue(wrappedGetters, (fn, key) => {
    if (getters[key]) {
      Object.defineProperty(store._getters, key, {
        get: () => getters[key](state),
        enumerable: true
      })
    }

    Object.defineProperty(store.getters, key, {
      get: () => wrappedGetters[key](state),
      enumerable: true
    })
  })
}

function installModule(store, rootState, path, module){
  const namespace = getNamespace(store._modules.root, path)

  if (module._rawModule.namespaced) {
    store._modulesNamespaceMap[namespace] = module
  }

  const local = module.context = makeLocalContext(store, namespace, path)

  forEachMutation(module, (mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  forEachAction(module, (action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  forEachGetter(module, (getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })
  
  if (module._children) {
      forEachChild(module, (child, key) => {
        installModule(store, rootState, path.concat(key), child)
      })
  }
}

function makeLocalContext (store, namespace, path) {
  const noNamespace = namespace === ''

  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (!store._actions[type]) {
          console.error(`[weux] unknown local action type: ${args.type}, global type: ${type}`)
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (!store._mutations[type]) {
          console.error(`[weux] unknown local mutation type: ${args.type}, global type: ${type}`)
          return
        }
      }

      store.commit(type, payload, options)
    }
  }

  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace)
    },
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    const gettersProxy = {}
    const splitPos = namespace.length
    
    if (store.getters) {
      Object.keys(store.getters).forEach(type => {
        if (type.slice(0, splitPos) !== namespace) return
  
        const localType = type.slice(splitPos)
        Object.defineProperty(gettersProxy, localType, {
          get: () => store.getters[type],
          enumerable: true
        })
      })
      store._makeLocalGettersCache[namespace] = gettersProxy
    }
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload)
  })
}

function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    return res
  })
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(`[weux] duplicate getter key: ${type}`)
    return
  }
  
  store._wrappedGetters[type] = function wrappedGetter () {
    return rawGetter(
      local.state, 
      local.getters, 
      store.state, 
      store.getters  
    )
  }
}

export default Store
