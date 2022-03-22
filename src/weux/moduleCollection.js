import { forEachChild } from '../helper/utils'

export default class ModuleCollection {
  constructor(options) {
    this.root = null
    this.register([], options)
  }
  
  register (path, rootModule) {
    let moduleMap = {
      _rawModule: rootModule,
      _children: {},
      state: rootModule.state
    }
    
    if (!this.root) {
      this.root = moduleMap
    } else {
      const curModuleName = path[path.length - 1]
      const fn = (acc, cur) => acc._children[cur]
      const parent = path.slice(0, -1).reduce(fn, this.root)
      parent._children[curModuleName] = moduleMap
      
      if (parent._children) {
        forEachChild(parent, (child, key) => {
          const parentState = parent.state
          parent.state = (typeof parentState === 'function' ? parentState() : parentState) || {}
          const childrenState = child.state
          child.state = (typeof childrenState === 'function' ? childrenState() : childrenState) || {}
          parent.state[key] = child.state
        })
      }
    }
    
    const childModules = rootModule.modules
    childModules &&
      Object.keys(childModules).forEach(childModuleName => {
        const curChildModule = childModules[childModuleName]
        this.register(path.concat(childModuleName), curChildModule)
      })
  }
}