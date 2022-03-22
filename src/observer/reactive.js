import Dep from './dep'
import { isMixinObject, isPlainObject } from '../helper/utils'

export default function observe (obj) {
    observeTarget(obj)
}

function observeTarget (data) {
    if (isMixinObject(data)) {
        if (Array.isArray(data)) {
            data.map(item => {
               if (isPlainObject(item)) {
                   defineReactive(item)
               } else {
                   observeTarget(item)
               }
            })
        } else {
            defineReactive(data)
        }
    }
}

function defineReactive (target) {
    const dep = new Dep()

    Object.keys(target).forEach(key => {
        let value = target[key]

        if (key !== '__webviewId__') {
            Object.defineProperty(target, key, {
                enumerable: true,
                configurable: true,
                get() {
                    if (Dep.target) {
                        dep.depend()
                    }
                    
                    return value
                },
                set(newValue) {
                    if (value == newValue) return
                    observeTarget(newValue)
                    value = newValue
                    dep.notify()
                }
            })
        }

        observeTarget(value)
    })
}