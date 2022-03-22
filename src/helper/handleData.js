import { equal, isMixinObject, isPlainObject } from './utils'

let watcherValue, equalValue, computedMap = {}

export default function handleData (ctx) {
  if (ctx.$store) {
      const { _computedWatchers: watchersMap, $store: { _rawState: rawState } } = ctx
      Object.keys(watchersMap).forEach(key => {
        const value = watchersMap[key].value
        if (isMixinObject(value)) {
            watcherValue = value
            handleState(rawState)
            computedMap[key] = equalValue
        }
      })
    
      ctx._rawData = { ...ctx._rawData, ...computedMap }
      computedMap = {}
  }
}

function handleState (data) {
    for (let key in data) {
      let value = data[key]

      if (isMixinObject(value)) {
         if (Array.isArray(value)) {
            if (equal(watcherValue, value)) {
                equalValue = value
                return
            }

            for (const item of value) {
              if (isPlainObject(item)) {
                   handleState(item)
                   if (equal(watcherValue, item)) {
                       equalValue = item
                       break
                   }
                } else {
                   handleState(item)
                }
            }
         } else {
            handleState(value)
         }

         if (isPlainObject(value)) {
             if (equal(watcherValue, value)) {
                 equalValue = value
                 break
             }
         }
      }
    }
}