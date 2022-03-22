import Watcher from './watcher'
import { noop } from '../helper/utils'
import { pushStack, updateComputed } from './updateComputed'
import Dep from './dep'

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}

export default function initComputed (ctx, target, computed) {
    pushStack(ctx)

    const computedMap = {}
    const watchers = ctx._computedWatchers = {}
    ctx._computedMap = {}

    for (const key in computed) {
        const userDef = computed[key]
        const getter = typeof userDef === 'function' ? userDef.bind(ctx) : userDef.get
        
        if (key in target) {
            console.error(`The computed property "${key}" is already defined in data`)
            continue
        } else {
            defineComputed(ctx, target, key, userDef)
        }

        const watcher = watchers[key] = new Watcher(ctx, getter || noop, () => {
           ctx._computedMap[key] = watcher.value
           updateComputed()
        }, { lazy: true })
        
        computedMap[key] = target[key]
    }
    
    try {
        ctx.setData(computedMap)
    } catch (e) {
        throw e
    }
}

function defineComputed (ctx, target, key, userDef) {
    if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = createComputedGetter(ctx, key)
        sharedPropertyDefinition.set = noop
    } else {
        sharedPropertyDefinition.get = userDef.get
          ? createComputedGetter(ctx, key)
          : noop

        sharedPropertyDefinition.set = userDef.set
          ? userDef.set.bind(ctx)
          : noop
    }
    
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter (ctx, key) {
    return () => {
      const watcher = ctx._computedWatchers && ctx._computedWatchers[key]
      
      if (watcher) {
        if (watcher.dirty) {
            watcher.evaluate()
        }
        
        if (Dep.target) {
            watcher.depend()
        }
        
        return watcher.value
      }
    }
  }
