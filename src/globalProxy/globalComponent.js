import initState from '../observer/index'
import initWatch from '../observer/watch'
import { noop } from '../helper/utils'
import handleData from '../helper/handleData'
import handleHook from '../helper/handleHook'

const myBehavior = Behavior({
  lifetimes: {
    attached: function () {
      handleHook(this, 'component')
    }
  }
})

const originalComponent = Component
export default Component = function (config = {}) {
  config.behaviors = [myBehavior]
  
  const lifeTimesBackup = {
    attached: (config.lifetimes && config.lifetimes.attached) ? config.lifetimes.attached : noop,
    detached: (config.lifetimes && config.lifetimes.detached) ? config.lifetimes.detached : noop,
    configAttached: config.attached ? config.attached : noop,
    configDetached: config.detached ? config.detached : noop
  }

  const pageLifetimesBackup = {
    show: (config.pageLifetimes && config.pageLifetimes.show) ? config.pageLifetimes.show : noop
  }

  if (config.lifetimes) {
      config.lifetimes = {
        attached: function () {
          initState(this, this.data, config.computed)
          wx.nextTick(() => {
            handleData(this)
          })
          
          lifeTimesBackup.attached.call(this)
        },
    
        detached: function () {
          teardown(this)
          lifeTimesBackup.detached.call(this)
        }
      }
  } else {
      if (config.attached && typeof config.attached === 'function') {
          config.attached = function () {
            initState(this, this.data, config.computed)
            wx.nextTick(() => {
              handleData(this)
            })

            lifeTimesBackup.configAttached.call(this)
          }

          config.detached = function () {
             teardown(this)
             ifeTimesBackup.configDetached.call(this)
          }
      } else {
          config.lifetimes = {
            attached: function () {
              initState(this, this.data, config.computed)
              wx.nextTick(() => {
                handleData(this)
              })
              
              lifeTimesBackup.attached.call(this)
            },
        
            detached: function () {
              teardown(this)
              lifeTimesBackup.detached.call(this)
            }
          }
      }
  }

  config.pageLifetimes = {
    show: function () {
       initWatch(this, config.watch)
       pageLifetimesBackup.show && pageLifetimesBackup.show.call(this)
    }
  }

  return originalComponent(config)
}

function teardown (ctx) {
  const computedWatchers = ctx._computedWatchers
  if (computedWatchers && Object.keys(computedWatchers).length) {
      Object.keys(computedWatchers).forEach(key => computedWatchers[key].teardown())
  }
}