let update = false
let add = false
const ctxStack = []
let temp = []

export function updateComputed (arg) {
   if (!update) {
      wx.nextTick(() => {
         const targetMap = ctxTarget()

         targetMap.map(ctx => {
            const computedMap = ctx._computedMap
            
            if (computedMap && Object.keys(computedMap).length) {
               try {
                  if (arg == 'updateComputed') {
                     ctx._rawData = JSON.parse(ctx._rawStr)
                     ctx._rawStr = null
                  } else {
                     if (ctx._rawBackup) {
                        ctx._rawData = ctx._rawBackup
                        ctx._rawBackup = null
                     }
                  }

                  ctx.setData(computedMap, () => {
                     ctx._computedMap = {}
                  })
               } catch (e) {
                  throw e
               }
            }
         })

         update = false
      })

      update = true
   }
}

export function pushStack (ctx) {
   temp.push(ctx)

   if (!add) {
      wx.nextTick(() => {
         if (ctxStack.length) {
            const pages = getCurrentPages()
            const isPage = pages[pages.length - 1].is
      
            ctxStack.map((stack, index) => {
               let ctxMap = stack.map(page => page.is)
               if (ctxMap.includes(isPage)) {
                  ctxStack.splice(index, 1)
               }
            })
         }
         
         ctxStack.push(temp)
         
         temp = []
         add = false
      })
      
      add = true
   }
}

export function ctxTarget () {
   const pages = getCurrentPages()
   const currentPage = pages[pages.length - 1]
   let result = []

   ctxStack.map(stack => {
      stack.map(ctx => {
         if (currentPage.is == ctx.is) {
            result = stack
         }
      })
   })

   return result
}
