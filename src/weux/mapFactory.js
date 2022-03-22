function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export const mapState = normalizeNamespace((namespace, states) => {
  const res = {}
  if (!isValidMap(states)) {
    console.error('[weux] mapState: mapper parameter must be either an Array or an Object')
  }

  normalizeMap(states).forEach(({ key, val }) => {
    res[key] = function mappedState () {
      let state = this.$store.state
      let getters = this.$store.getters
      
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapState', namespace)

        if (!module) {
          return
        }
        
        state = module.context.state
        getters = module.context.getters
      }

      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    }
  })

  return res
})

export const mapMutations = normalizeNamespace((namespace, mutations) => {
  const res = {}
  if (!isValidMap(mutations)) {
    console.error('[weux] mapMutations: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(mutations).forEach(({ key, val }) => {
    res[key] = function mappedMutation (...args) {
      let commit = this.$store.commit
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapMutations', namespace)
        if (!module) {
          return
        }
        
        commit = module.context.commit
      }

      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    }
  })
  
  return res
})

export const mapGetters = normalizeNamespace((namespace, getters) => {
  const res = {}
  if (!isValidMap(getters)) {
    console.error('[weux] mapGetters: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(getters).forEach(({ key, val }) => {
    val = namespace + val
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }

      if (!(val in this.$store.getters)) {
        console.error(`[weux] unknown getter: ${val}`)
        return
      }

      return this.$store.getters[val]
    }
  })

  return res
})


export const mapActions = normalizeNamespace((namespace, actions) => {
  const res = {}
  if (!isValidMap(actions)) {
    console.error('[weux] mapActions: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(actions).forEach(({ key, val }) => {
    res[key] = function mappedAction (...args) {
      let dispatch = this.$store.dispatch
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapActions', namespace)
        if (!module) {
          return
        }

        dispatch = module.context.dispatch
      }

      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    }
  })

  return res
})

export const createNamespacedHelpers = (namespace) => ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
})

function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }

  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}


function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

function normalizeNamespace (fn) {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }

    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace]
  
  if (!module) {
    console.error(`[weux] module namespace not found in ${helper}(): ${namespace}`)
  }

  return module
}
