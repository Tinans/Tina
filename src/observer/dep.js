import { remove } from '../helper/utils'

let uid = 0

class Dep {
    constructor() {
        this.subs = []
        this.id = uid++
    }
    
    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        remove(this.subs, sub)
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    notify() {
        const subs = this.subs.slice()
        
        for (let i = 0, len = subs.length; i < len; i++) {
            subs[i].update()
        }
    }
}

Dep.target = null
const targetStack = []

export function pushTarget (_target) {
    if (Dep.target) targetStack.push(Dep.target)
    Dep.target = _target
}

export function popTarget () {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1]
}

export default Dep
