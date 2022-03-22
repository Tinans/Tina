import { deepMerge, extend } from './utils'
import Request from './core/request'
import defaults from './defaults'
import CancelToken from './core/cancelToken'
import graphQL from './core/graphQL'

function createInstance(config) {
	const context = new Request(config)
	const instance = Request.prototype.request.bind(context)
	extend(instance, context)
	return instance
}

const request = createInstance(defaults)

request.create = function (config) {
	return createInstance(deepMerge(defaults, config))
}

request.CancelToken = CancelToken
request.graphQL = graphQL

export default request