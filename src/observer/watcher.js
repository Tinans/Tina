import Dep, { pushTarget, popTarget } from './dep'
import { queueWatcher } from './scheduler'
import { noop, parsePath, equal, isObject } from '../helper/utils'
import { invokeWithWatch } from './watch'

let uid = 0

class Watcher {
    constructor(vm, fn, cb, options) {
        this.vm = vm
        this.fn = fn
        this.cb = cb
        this.id = ++uid
        this.deps = []
        this.newDeps = []
        this.depIds = new Set()
        this.newDepIds = new Set()
        this.active = true
        
        if (options) {
            this.user = !!options.user
            this.lazy = !!options.lazy
            this.sync = !!options.sync
        } else {
            this.user = this.lazy = this.sync = false
        }
        
        if (typeof fn === 'function') {
            this.getter = fn
        } else {
            this.getter = parsePath(fn)
            if (!this.getter) {
                this.getter = noop
                console.warn(`Failed watching path: ${getter} Watcher only accepts simple dot-delimited paths.For full control, use a function instead.`)
            }
        }

        this.dirty = this.lazy
        this.value = this.lazy ? undefined : this.getWatcher()
    }
    evaluate() {
        this.value = this.getWatcher()
        this.dirty = false
    }
    getWatcher() {
        pushTarget(this)
        let value
        try {
            value = this.getter.call(this.vm, this.vm)
        } catch (e) {
            throw e
        } finally {
            popTarget()
            this.cleanupDeps()
        }
        
        return value
    }
    update() {
      if (this.lazy) {
          this.dirty = true
          let oldValue = this.value
          let newValue = this.getter.call(this.vm, this.vm)
          
          if (!equal(oldValue, newValue)) {
              this.value = newValue
              typeof this.cb === 'function' && this.cb.call(this.vm)
          }
        } else if (this.sync) {
           this.run()
        } else {
           queueWatcher(this)
        }
    }
    run() {
      if (this.active) {
         const value = this.getWatcher()
        
         if (value !== this.value || isObject(value)) {
            const oldValue = this.value
            this.value = value
            
            if (this.user) {
                    try {
                        invokeWithWatch(this, value, oldValue)
                    } catch (e) {
                        console.error(e, this.vm.is, `callback for watcher "${this.getter}"`)
                    }
                } else {
                    invokeWithWatch(this, value, oldValue)
                }
            }
        }
    }
    addDep(dep) {
      const id = dep.id

      if (!this.newDepIds.has(id)) {
          this.newDepIds.add(id)
          this.newDeps.push(dep)

          if (!this.depIds.has(id)) {
              dep.addSub(this)
          }
      }
    }
    cleanupDeps() {
        let i = this.deps.length
        while (i--) {
          const dep = this.deps[i]
          if (!this.newDepIds.has(dep.id)) {
              dep.removeSub(this)
          }
        }

        let tmp = this.depIds
        this.depIds = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        tmp = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp
        this.newDeps.length = 0
    }
    depend() {
        if (Dep.target) {
            let i = this.deps.length
            while (i--) {
                this.deps[i].depend()
            }
        }
    }
    teardown() {
        if (this.active) {
            let i = this.deps.length
            while (i--) {
                this.deps[i].removeSub(this)
            }

            this.active = false
        }
    }
}

export default Watcher