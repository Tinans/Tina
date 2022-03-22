class EventBus {
  constructor () {
    this.eventTask = {}
  }

  on(name, cb) {
    if (!this.eventTask[name]) {
      this.eventTask[name] = []
    }

    typeof cb === 'function' && this.eventTask[name].push(cb)
  }

  emit(name, ...args) {
    let taskQueen = this.eventTask[name]
    if (taskQueen && taskQueen.length > 0) {
      taskQueen.forEach(cb => cb(...args))
    }
  }

  off(name, cb) {
    let taskQueen = this.eventTask[name]
    if (taskQueen && taskQueen.length > 0) {
      let index = taskQueen.indexOf(cb)
      index != -1 && taskQueen.splice(index, 1)
    }
  }

  once(name, cb) {
    function callback (...args) {
      this.off(name, cb)
      cb(...args)
    }
    
    typeof cb === 'function' && this.on(name, callback)
  }
}

export default new EventBus()