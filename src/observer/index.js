import reactive from './reactive'
import initComputed from './computed'

export default function initState (ctx, target, computed) {
    reactive(target)
    initComputed(ctx, target, computed)
}