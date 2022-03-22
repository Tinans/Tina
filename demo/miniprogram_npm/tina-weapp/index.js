module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625979128533, function(require, module, exports) {
var __TEMP__ = require('../weapp/axios/index');var axios = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./weux/index');var Store = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./weux/mapFactory');var mapState = __TEMP__['mapState'];var mapMutations = __TEMP__['mapMutations'];var mapActions = __TEMP__['mapActions'];var mapGetters = __TEMP__['mapGetters'];var createNamespacedHelpers = __TEMP__['createNamespacedHelpers'];
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./globalProxy/globalPage');Object.keys(__TEMP__).forEach(function(k) { if (k === "default" || k === "__esModule") return; Object.defineProperty(exports, k, { enumerable: true, configurable: true, get: function() { return __TEMP__[k]; } }); });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./globalProxy/globalComponent');Object.keys(__TEMP__).forEach(function(k) { if (k === "default" || k === "__esModule") return; Object.defineProperty(exports, k, { enumerable: true, configurable: true, get: function() { return __TEMP__[k]; } }); });

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = {
  axios,
  Store,
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
  createNamespacedHelpers
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, 'axios', { enumerable: true, configurable: true, get: function() { return axios; } });Object.defineProperty(exports, 'Store', { enumerable: true, configurable: true, get: function() { return Store; } });Object.defineProperty(exports, 'mapState', { enumerable: true, configurable: true, get: function() { return mapState; } });Object.defineProperty(exports, 'mapMutations', { enumerable: true, configurable: true, get: function() { return mapMutations; } });Object.defineProperty(exports, 'mapActions', { enumerable: true, configurable: true, get: function() { return mapActions; } });Object.defineProperty(exports, 'mapGetters', { enumerable: true, configurable: true, get: function() { return mapGetters; } });Object.defineProperty(exports, 'createNamespacedHelpers', { enumerable: true, configurable: true, get: function() { return createNamespacedHelpers; } });








}, function(modId) {var map = {"../weapp/axios/index":1625979128534,"./weux/index":1625979128544,"./weux/mapFactory":1625979128549,"./globalProxy/globalPage":1625979128550,"./globalProxy/globalComponent":1625979128565}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128534, function(require, module, exports) {
var __TEMP__ = require('./utils');var deepMerge = __TEMP__['deepMerge'];var extend = __TEMP__['extend'];
var __TEMP__ = require('./core/request');var Request = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./defaults');var defaults = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/cancelToken');var CancelToken = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/graphQL');var graphQL = __REQUIRE_DEFAULT__(__TEMP__);

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

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = request;
}, function(modId) { var map = {"./utils":1625979128535,"./core/request":1625979128536,"./defaults":1625979128540,"./core/cancelToken":1625979128541,"./core/graphQL":1625979128542}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128535, function(require, module, exports) {
const _toString = Object.prototype.toString

const typeClass = {
	date: '[object Date]',
	object: '[object Object]'
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isDate(val) {
	return _toString.call(val) === typeClass['date']
};exports.isDate = isDate

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isObject(val) {
	return val !== null && typeof val === 'object'
};exports.isObject = isObject

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isPlainObject(val) {
	return _toString.call(val) === typeClass['object']
};exports.isPlainObject = isPlainObject

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function extend(_to, _from) {
	const requestAPI = ['request', 'get', 'delete', 'head', 'options', 'post', 'put', 'patch', '_requestMethodWithData', '_requestMethodWithoutData']
	for (const key in _from) {
		_to[key] = _from[key]
	}
	requestAPI.forEach(key => {
		_to[key] = _from[key]
	})
	return _to
};exports.extend = extend

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function deepMerge(...obj) {
	const result = {}
	obj.forEach(item => {
		if (!item) return
		Object.keys(item).forEach(key => {
			const val = item[key]
			if (isPlainObject(val)) {
				if (isPlainObject(result[key])) {
					result[key] = deepMerge(result[key], val)
				} else {
					result[key] = deepMerge(val)
				}
			} else {
				result[key] = val
			}
		})
	})
	return result
};exports.deepMerge = deepMerge

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function flattenHeaders(headers, method) {
	if (!headers) {
		return headers
	}
	headers = deepMerge(headers.common || {}, headers[method] || {}, headers)
	const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
	methodsToDelete.forEach(method => {
		delete headers[method]
	})
	return headers
};exports.flattenHeaders = flattenHeaders
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128536, function(require, module, exports) {
var __TEMP__ = require('./mergeConfig');var mergeConfig = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./dispatchRequest');var dispatchRequest = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./interceptorManager');var InterceptorManager = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Request {
	constructor(config) {
		this.defaults = config
		this.interceptors = {
			request: new InterceptorManager(),
			response: new InterceptorManager()
		}
	}

	request(url, config = {}) {
		if (typeof url === 'string') {
			config.url = url
		} else {
			config = url
		}

		const originConfig = config
		config = mergeConfig(this.defaults, config)
		config.originConfig = originConfig
		const promiseChain = [{
			resolved: dispatchRequest,
			rejected: undefined
		}]

		this.interceptors.request.forEach(interceptor => promiseChain.unshift(interceptor))
		this.interceptors.response.forEach(interceptor => promiseChain.push(interceptor))
		let promise = Promise.resolve(config)
		
		while (promiseChain.length) {
			const {
				resolved,
				rejected
			} = promiseChain.shift()
			promise = promise.then(resolved, rejected)
		}
		
		return promise
	}

	get(url, config) {
		return this._requestMethodWithoutData('get', url, config)
	}

	delete(url, config) {
		return this._requestMethodWithoutData('delete', url, config)
	}

	head(url, config) {
		return this._requestMethodWithoutData('head', url, config)
	}

	options(url, config) {
		return this._requestMethodWithoutData('options', url, config)
	}

	post(url, data, config) {
		return this._requestMethodWithData('post', url, data, config)
	}

	put(url, data, config) {
		return this._requestMethodWithData('put', url, data, config)
	}

	patch(url, data, config) {
		return this._requestMethodWithData('patch', url, data, config)
	}

	_requestMethodWithoutData(method, url, config) {
		return this.request(
			Object.assign(config || {}, {
				method,
				url
			})
		)
	}

	_requestMethodWithData(method, url, data, config) {
		return this.request(
			Object.assign(config || {}, {
				method,
				url,
				data
			})
		)
	}
};exports.default = Request
}, function(modId) { var map = {"./mergeConfig":1625979128537,"./dispatchRequest":1625979128538,"./interceptorManager":1625979128539}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128537, function(require, module, exports) {
var __TEMP__ = require('../utils');var isPlainObject = __TEMP__['isPlainObject'];var deepMerge = __TEMP__['deepMerge'];

const strats = Object.create(null)

const defaultStratKeys = ['url', 'params', 'key']

const deepMergeStratKeys = ['headers']

defaultStratKeys.forEach(key => {
	strats[key] = defaultStrat
})

deepMergeStratKeys.forEach(key => {
	strats[key] = deepMergeStrat
})

function defaultStrat(val1, val2) {
	return typeof val2 !== 'undefined' ? val2 : val1
}

function deepMergeStrat(val1, val2) {
	if (isPlainObject(val2)) {
		return deepMerge(val1, val2)
	} else if (typeof val2 !== 'undefined') {
		return val2
	} else if (isPlainObject(val1)) {
		return deepMerge(val1)
	} else if (typeof val1 !== 'undefined') {
		return val1
	}
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function mergeConfig(config1, config2 = {}) {
	const config = {}
	for (const key in config2) {
		mergeField(key)
	}

	for (const key in config1) {
		if (!config2[key]) {
			mergeField(key)
		}
	}

	function mergeField(key) {
		const strat = strats[key] || defaultStrat
		config[key] = strat(config1[key], config2[key])
	}
	return config
};exports.default = mergeConfig
}, function(modId) { var map = {"../utils":1625979128535}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128538, function(require, module, exports) {
var __TEMP__ = require('../utils');var flattenHeaders = __TEMP__['flattenHeaders'];

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function dispatchRequest(config) {
	procressConfig(config)
	return wxRequest(config).then(res => {
		return transformResponse(res, config)
	})
};exports.default = dispatchRequest

function procressConfig(config) {
	config.headers = transformHeaders(config)
	config.url = transformURL(config.baseURL, config.url)
	config.method = (config.method || 'GET').toUpperCase()
}

function transformURL(baseURL = '', url) {
	return baseURL + url
}

function transformHeaders(config) {
	const headers = flattenHeaders(config.headers, config.method)
	const { auth, authKey, authURL, url } = config
	if (authURL.exclusive && authURL.exclusive.includes(url)) {
		return headers
	}
	if (authURL.inclusive && !authURL.inclusive.includes(url)) {
		return headers
	}
	if (auth &&
		authKey &&
		typeof authKey === 'string' &&
		headers[authKey] === undefined &&
		headers[authKey.toLowerCase()] === undefined) {
			const authType = typeof config.auth
			let authStr = ''
			if (authType === 'string') {
				authStr = auth
			} else if (authType === 'function') {
				authStr = auth()
			}
			if (authStr && typeof authStr === 'string') {
				headers[authKey] = authStr
			}
	}
		return headers
}

function transformResponse(res, config) {
	res.config = config
	return res
}

function wxRequest(config) {
	return new Promise((resolve, reject) => {
		const {
			url,
			method,
			data,
			params,
			timeout,
			headers: header,
			dataType = 'json',
			responseType = 'text',
			cancelToken
		} = config
		const requestTask = wx.request({
			url,
			method,
			data: method === 'GET' ? params : data,
			header,
			timeout,
			dataType,
			responseType,
			success: res => resolve(res),
			fail: err => reject(err),
			complete: () => { }
		})
		if (cancelToken) {
			cancelToken.promise.then(reason => {
				requestTask.abort()
				reject(reason)
			})
		}
	})
}
}, function(modId) { var map = {"../utils":1625979128535}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128539, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class InterceptorManager {
	constructor() {
		this.interceptors = []
	}

	use(resolved, rejected) {
		this.interceptors.push({
			resolved,
			rejected
		})
		
		return this.interceptors.length - 1
	}

	forEach(fn) {
		this.interceptors.forEach(interceptor => {
			if (interceptor !== null) {
				fn(interceptor)
			}
		})
	}

	eject(id) {
		if (this.interceptors[id]) {
			this.interceptors[id] = null
		}
	}
};exports.default = InterceptorManager
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128540, function(require, module, exports) {
const defaults = {
	method: 'GET',

	timeout: 0,

	headers: {
		common: {
			Accept: 'application/json, text/plain, */*'
		}
	},

	baseURL: '',

	auth: null, // {null | String | Function}

	authKey: 'Authorization',

	authURL: {
		inclusive: null,
		exclusive: null
	} // {null | String[]}
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
	defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
	defaults.headers[method] = {
		'Content-Type': 'application/json;charset=utf-8'
	}
})

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = defaults;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128541, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function')
    }

    let resolvePromise = null
    this.promise = new Promise(resolve => {
      resolvePromise = resolve
    })
    executor(message => {
      if (this.reason) return
      this.reason = message  ? `Cancel: ${message}` : 'Canceled'
      resolvePromise(this.reason)
    })
  }
};exports.default = CancelToken

CancelToken.source = function source() {
  let cancel
  let token = new CancelToken(function executor(c) {
    cancel = c
  })
  
  return {
    token,
    cancel
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128542, function(require, module, exports) {
var __TEMP__ = require('./request');var Request = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../utils');var deepMerge = __TEMP__['deepMerge'];
var __TEMP__ = require('../defaults');var defaults = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./logger');var requestStart = __TEMP__['requestStart'];var requestEndError = __TEMP__['requestEndError'];var requestEnd = __TEMP__['requestEnd'];

const cache = {}

/**
 * Request的graphQL扩展
 */
class graphQL {
    constructor(config = {}) {
        this.client = new Request(deepMerge(defaults, config))
        this.config = config
        if (config.custom !== 'undefined') {
            this.isCustomQueryStatement = !!config.custom
        } else {
            this.isCustomQueryStatement = false
        }
    }
    /**
     * @property {String} query query查询语句
     * @property {Object} variables 查询参数
     */
    query(data, config = {}) {
        const type = 'query'
        return this.dispatchRequest(data, config, type, 'query')
    }
    /**
     * @property {String} mutation mutation查询语句
     * @property {Object} variables 查询参数
     */
    mutate(data, config = {}) {
        const type = 'mutation'
        data.query = data.mutation
        return this.dispatchRequest(data, config, type, 'mutate')
    }
    dispatchRequest(data, config, type, handleType) {
        let { query, variables = {}, responseNode, custom } = data
        if (!(query = formatQuery(query))) {
            return Promise.reject()
        }
        let queryStatement = ''
        let isCustomQueryStatement
        let variablesWithScoped = {}
        let ast = null
        if (typeof custom === 'boolean') {
            isCustomQueryStatement = custom
        } else {
            isCustomQueryStatement = this.isCustomQueryStatement
        }
        if (isCustomQueryStatement) {
            queryStatement = query
        } else {
            const cacheKey = query.join('/') + responseNode || ''
            if (cache[cacheKey]) {
                queryStatement = cache[cacheKey]
            } else {
                try {
                    ast = parse(query, responseNode, type, variables)
                    // queryStatement = cache[cacheKey] = gencode(ast)
                    queryStatement = gencode(ast)
                    variablesWithScoped = getVariablesWithScoped(ast)
                    if (this.config.logger) {
                        requestStart(ast, variablesWithScoped)
                    }
                } catch (err) {
                    cache[cacheKey] = ''
                    console.error(err)
                    return Promise.reject()
                }
            }
        }
        config = Object.assign({}, config, {
            isGql: true,
            gql: ast
        })
        return this.client.post(this.config.url, { query: queryStatement, variables: variablesWithScoped }, config).then(
            res => {
                if (this.config.logger) {
                    requestEnd(ast, res)
                }
                return Promise.resolve(res)
            },
            err => {
                if (this.config.logger) {
                    requestEndError(ast, err)
                }
                return Promise.reject(err)
            }
        )
    }
}

function parse(queries, responseNode, type, variables) {
    if (!responseNode) {
        responseNode = {}
    }
    const isOnlyQuery = queries.length === 1
    // const resultMap = {}
    const resultArr = []
    queries.forEach(query => {
        const ast = parseQuery(query, responseNode, type, variables, isOnlyQuery)
        // resultMap[ast.operationName] = ast
        resultArr.push(ast)
    })
    return resultArr
}

/**
 * @param {Object[]} ast query的ast
 */
function gencode(ast) {
    let result = ''
    const operationType = ast[0].operationType
    const operationName = ast.map(item => item.operationName).join('_')
    const variablesScoped = getVariablesScoped(ast)
    const variablesStatement = variablesScoped.length > 0 ? `(${variablesScoped.join(',')})` : ''
    result += `${operationType} ${operationName}${variablesStatement}{
        ${createMainStatement(ast)}
    }`
    function getVariablesScoped(ast) {
        const _v = []
        ast.forEach(item => {
            const { operationName, variables } = item
            _v.push(...variables.map(({ key, type }) => {
                return `$${operationName}_${key}:${type}`
            }))
        })
        return _v
    }
    function createMainStatement(ast) {
        let _s = ''
        ast.forEach(item => {
            const { operationName, variables, responseNode } = item
            const hasVariables = variables && variables.length > 0
            _s += operationName
            if (hasVariables) {
                const _vs = variables.map(({ key }) => `${key}:$${operationName}_${key}`).join(',')
                _s += `(${_vs})`
            }
            if (responseNode) {
                _s += `{${responseNode}}`
            }
            _s += `↵`
        })
        return _s
    }
    return result
}

/**
 *
 * @param {String|String[]} query
 */
function formatQuery(query) {
    if (!query) {
        return false
    }
    if (typeof query === 'string') {
        return [query]
    }
    if (Array.isArray(query)) {
        if (query.some(item => typeof item !== 'string')) {
            console.error(`query为数组时需要是 "string[]" 类型`)
            return false
        }
        return query
    }
    console.error('query只支持 string 和 string[] 类型')
    return false
}

/**
 *
 * @param {String} query query语句
 * @param {String | Object} responseNode 返回节点声明
 * @param {String}} type 操作类型
 * @param {Object} variables 变量
 */
function parseQuery(query, responseNode, type, variables, isOnlyQuery) {
    query = query.trim()
    const contentReg = /\(([^)]*)\)/
    const result = {}
    let match = query.match(contentReg)
    if (!match) {
        query += '()'
        match = query.match(contentReg)
        if (!match) {
            throw new Error(`${query}语法错误`)
        }
    }
    const variablesStatement = match[1]
    const operationIdx = match['index']
    const operationName = query.substr(0, operationIdx)
    if (!operationName) {
        throw new Error(`缺少操作名称: ${query}`)
    }
    result.operationName = operationName
    result.variables = []
    result.variablesMap = {}
    if (variablesStatement) {
        variablesStatement.split(',').forEach(item => {
            let [key, type] = item.split(':')
            key = key.trim()
            type = type.trim()
            if (!type) {
                throw new Error(`变量"${key}"缺少类型: ${query}`)
            }
            result.variables.push({ key, type })
            result.variablesMap[key] = type
        })
    }
    if (typeof responseNode === 'string') {
        responseNode = { [operationName]: responseNode }
    }
    result.variablesStore = isOnlyQuery ? variables : (variables[operationName] || {})
    result.responseNode = responseNode[operationName] || ''
    result.operationType = type
    return result
}

function getVariablesWithScoped(ast) {
    const result = {}
    if (ast && ast.length > 0) {
        ast.forEach(item => {
            const { operationName, variablesStore } = item
            Object.keys(variablesStore).forEach(key => {
                result[`${operationName}_${key}`] = variablesStore[key]
            })
        })
    }
    return result
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = graphQL;
}, function(modId) { var map = {"./request":1625979128536,"../utils":1625979128535,"../defaults":1625979128540,"./logger":1625979128543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128543, function(require, module, exports) {
const loggerMap = {}

function getOperationName(ast) {
    return ast.map(item => item.operationName).join('_')
}

function getOperationType(ast) {
    return ast[0].operationType
}

function transAst(ast) {
    return {
        name: getOperationName(ast),
        type: getOperationType(ast)
    }
}

function printLog(loggerItem) {
    const { request, response, type, name } = loggerItem
    console.log(`%c ${type} : ${name} `, `background-color:${type === 'query' ? '#00ff00' : '#ffc400'};color:#000`)
    console.log('请求', request.variables)
    console.log('响应', response)
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function requestStart(ast, variables) {
    const { name, type } = transAst(ast)
    loggerMap[name] = {
        request: {
            variables
        },
        response: {},
        type,
        name
    }
};exports.requestStart = requestStart

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function requestEnd(ast, res) {
    const { name } = transAst(ast)
    if (name && loggerMap[name]) {
        loggerMap[name].response = res
        printLog(loggerMap[name])
    }
};exports.requestEnd = requestEnd

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function requestEndError(ast, err) {
    const { name, type } = transAst(ast)
    console.log(`%c ${type} : ${name}  %c Error `, `background-color:${type === 'query' ? '#00ff00' : '#ffc400'};color:#000`, 'background-color:#ff0000;color:#fff')
    console.log('AST', ast)
    console.log('err', err)
};exports.requestEndError = requestEndError
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128544, function(require, module, exports) {
var __TEMP__ = require('./moduleCollection');var ModuleCollection = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../observer/reactive');var reactive = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../helper/utils');var isPromise = __TEMP__['isPromise'];var getNestedState = __TEMP__['getNestedState'];var unifyObjectStyle = __TEMP__['unifyObjectStyle'];var forEachValue = __TEMP__['forEachValue'];var forEachChild = __TEMP__['forEachChild'];var forEachMutation = __TEMP__['forEachMutation'];var forEachAction = __TEMP__['forEachAction'];var forEachGetter = __TEMP__['forEachGetter'];var isObject = __TEMP__['isObject'];var getNamespace = __TEMP__['getNamespace'];












class Store {
  constructor (options = {}) {
    this._init = false
    this._actions = {}
    this._mutations = {}
    this._wrappedGetters = {}
    this._makeLocalGettersCache = {}
    this._modulesNamespaceMap = {}
    this._modules = new ModuleCollection(options)
    const state = this._states = this._modules.root.state
    this._rawState = JSON.parse(JSON.stringify(state))

    const store = this
    const { dispatch, commit } = this

    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }

    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }
    
    installModule(this, state, [], this._modules.root)
    resetStoreGetter(this, state)
  }

  commit (type, payload) {
    if (isObject(type) && type.type) {
      payload = type
      type = type.type
    }
    
    const entry = this._mutations[type]
    if (!entry) {
      console.error(`[weux] unknown mutation type: ${type}`)
      return
    }
    entry.forEach(handler => handler(payload))
  }

  dispatch (type, payload) {
    if (isObject(type) && type.type) {
      payload = type
      type = type.type
    }

    const entry = this._actions[type]
    if (!entry) {
      console.error(`[weux] unknown action type: ${type}`)
      return
    }
    return entry.length > 1
      ? Promise.all(entry.map(handler => handler(payload)))
      : entry[0](payload)
  }

  get state() {
    if (!this._init) {
      reactive(this._states)
      this._init = true
    }

    return this._states
  }

  set state (val) {
    console.error(`use store commit to explicit replace store state.`)
  }
}

function resetStoreGetter (store, state) {
  let { getters } = store._modules.root._rawModule
  getters = getters || {}
  
  store.getters = {}
  store._getters = {}
  store._makeLocalGettersCache = Object.create(null)
  const wrappedGetters = store._wrappedGetters

  forEachValue(wrappedGetters, (fn, key) => {
    if (getters[key]) {
      Object.defineProperty(store._getters, key, {
        get: () => getters[key](state),
        enumerable: true
      })
    }

    Object.defineProperty(store.getters, key, {
      get: () => wrappedGetters[key](state),
      enumerable: true
    })
  })
}

function installModule(store, rootState, path, module){
  const namespace = getNamespace(store._modules.root, path)

  if (module._rawModule.namespaced) {
    store._modulesNamespaceMap[namespace] = module
  }

  const local = module.context = makeLocalContext(store, namespace, path)

  forEachMutation(module, (mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  forEachAction(module, (action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  forEachGetter(module, (getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })
  
  if (module._children) {
      forEachChild(module, (child, key) => {
        installModule(store, rootState, path.concat(key), child)
      })
  }
}

function makeLocalContext (store, namespace, path) {
  const noNamespace = namespace === ''

  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (!store._actions[type]) {
          console.error(`[weux] unknown local action type: ${args.type}, global type: ${type}`)
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (!store._mutations[type]) {
          console.error(`[weux] unknown local mutation type: ${args.type}, global type: ${type}`)
          return
        }
      }

      store.commit(type, payload, options)
    }
  }

  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace)
    },
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    const gettersProxy = {}
    const splitPos = namespace.length
    
    if (store.getters) {
      Object.keys(store.getters).forEach(type => {
        if (type.slice(0, splitPos) !== namespace) return
  
        const localType = type.slice(splitPos)
        Object.defineProperty(gettersProxy, localType, {
          get: () => store.getters[type],
          enumerable: true
        })
      })
      store._makeLocalGettersCache[namespace] = gettersProxy
    }
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload)
  })
}

function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    return res
  })
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(`[weux] duplicate getter key: ${type}`)
    return
  }
  
  store._wrappedGetters[type] = function wrappedGetter () {
    return rawGetter(
      local.state, 
      local.getters, 
      store.state, 
      store.getters  
    )
  }
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = Store;

}, function(modId) { var map = {"./moduleCollection":1625979128545,"../observer/reactive":1625979128547,"../helper/utils":1625979128546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128545, function(require, module, exports) {
var __TEMP__ = require('../helper/utils');var forEachChild = __TEMP__['forEachChild'];

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class ModuleCollection {
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
};exports.default = ModuleCollection
}, function(modId) { var map = {"../helper/utils":1625979128546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128546, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function noop () {};exports.noop = noop

let unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
let bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"))
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    if (obj && obj.data) {
        let { data } = obj
        for (var i = 0; i < segments.length; i++) {
        data = data[segments[i]]
      }

      return data
    }

    return obj
  }
};exports.parsePath = parsePath

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function equal(a, b) {
  if (a === b) return true

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = Array.isArray(a),
        arrB = Array.isArray(b),
        i,
        length,
        key

    if (arrA && arrB) {
      length = a.length
      if (length != b.length) return false
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false
      return true
    }

    if (arrA != arrB) return false

    var dateA = a instanceof Date,
        dateB = b instanceof Date
    if (dateA != dateB) return false
    if (dateA && dateB) return a.getTime() == b.getTime()

    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp
        
    if (regexpA != regexpB) return false
    if (regexpA && regexpB) return a.toString() == b.toString()

    var keys = Object.keys(a)
    length = keys.length

    if (length !== Object.keys(b).length)
      return false

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false

    for (i = length; i-- !== 0;) {
      key = keys[i]
      if (!equal(a[key], b[key])) return false
    }

    return true
  }

  return a!==a && b!==b
};exports.equal = equal

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isPlainObject (obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
};exports.isPlainObject = isPlainObject

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isMixObject (value) {
  return Object.prototype.toString.call(value) === "[object Object]" || Array.isArray(value)
};exports.isMixObject = isMixObject

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isObject (obj) {
  return obj !== null && typeof obj === 'object'
};exports.isObject = isObject

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function strToUpperCase (str) {  
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());  
};exports.strToUpperCase = strToUpperCase

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isEmptyObject (obj) {
  if (!obj) {
    return true
  }
  for (let key in obj) {
    return false
  }
  return true
};exports.isEmptyObject = isEmptyObject

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isNotEmptyObject (obj) {
  return obj !== null && typeof obj === 'object' && Object.keys(obj).length
};exports.isNotEmptyObject = isNotEmptyObject

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
};exports.remove = remove

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function once () {
   let called = false
   return (fn) => {
      if (!called) {
          called = true
          typeof fn === 'function' && fn()
      }
   }
};exports.once = once

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function asyncLock () {
  let lock = false
  return (fn, onerror) => {
    if (!lock) {
      lock = true
      Promise.resolve().then(() => {
        lock = false
        typeof fn === 'function' && fn()
      }).catch(e => {
        lock = false
        typeof onerror === 'function' && onerror()
        console.error('Something wrong in wxapp asyncLock func execution, please check.', undefined, e)
      })
    }
  }
};exports.asyncLock = asyncLock

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function getObjByKey (obj) {
  const result = {}
  Object.keys(obj).forEach(key => {
      const keys = key.split('.')

      if (keys.length > 1) {
          if (obj[key] === null) {
              result[key] = ''
          } else {
              result[key] = obj[key]
          }
      } else {
          if (obj[key] !== null) {
              result[key] = obj[key]
          }
      }
  })

  return result
};exports.getObjByKey = getObjByKey

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
};exports.forEachValue = forEachValue

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function forEachMutation (module, fn) {
  if (module._rawModule.mutations) {
    forEachValue(module._rawModule.mutations, fn)
  }
};exports.forEachMutation = forEachMutation

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function forEachAction (module, fn) {
  if (module._rawModule.actions) {
    forEachValue(module._rawModule.actions, fn)
  }
};exports.forEachAction = forEachAction

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function forEachChild (module, fn) {
  forEachValue(module._children, fn)
};exports.forEachChild = forEachChild

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function forEachGetter (module, fn) {
  if (module._rawModule.getters) {
    forEachValue(module._rawModule.getters, fn)
  }
};exports.forEachGetter = forEachGetter

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isPromise (val) {
  return val && typeof val.then === 'function'
};exports.isPromise = isPromise

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
};exports.partial = partial

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function getNestedState (state, path) {
  return path.reduce((state, key) => state[key], state)
};exports.getNestedState = getNestedState

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload
    payload = type
    type = type.type
  }

  return { type, payload, options }
};exports.unifyObjectStyle = unifyObjectStyle

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function getNamespace(root, path) { 
  let rootModule = root
  return path.reduce((namespace, key) => {
    rootModule = rootModule._children[key]
    return namespace + (rootModule._rawModule.namespaced ? key + '/' : '')
  }, '')
};exports.getNamespace = getNamespace
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128547, function(require, module, exports) {
var __TEMP__ = require('./dep');var Dep = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../helper/utils');var isMixObject = __TEMP__['isMixObject'];var isPlainObject = __TEMP__['isPlainObject'];

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function observe (obj) {
    observeTarget(obj)
};exports.default = observe

function observeTarget (data) {
    if (isMixObject(data)) {
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
                    value = newValue
                    observeTarget(newValue)
                    dep.notify()
                }
            })
        }

        observeTarget(value)
    })
}
}, function(modId) { var map = {"./dep":1625979128548,"../helper/utils":1625979128546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128548, function(require, module, exports) {
var __TEMP__ = require('../helper/utils');var remove = __TEMP__['remove'];

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

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function pushTarget (_target) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
};exports.pushTarget = pushTarget

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
};exports.popTarget = popTarget

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = Dep;

}, function(modId) { var map = {"../helper/utils":1625979128546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128549, function(require, module, exports) {
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var mapState = exports.mapState = normalizeNamespace((namespace, states) => {
  const res = {}
  if (!isValidMap(states)) {
    console.error('[weux] mapState: mapper parameter must be either an Array or an Object')
  }

  normalizeMap(states).forEach(({ key, val }) => {
    res[key] = function mappedState () {
      let state = this.$store.state
      let getters = this.$store.getters
      
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapState', namespace)

        if (!module) {
          return
        }
        
        state = module.context.state
        getters = module.context.getters
      }

      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    }
  })

  return res
});

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var mapMutations = exports.mapMutations = normalizeNamespace((namespace, mutations) => {
  const res = {}
  if (!isValidMap(mutations)) {
    console.error('[weux] mapMutations: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(mutations).forEach(({ key, val }) => {
    res[key] = function mappedMutation (...args) {
      let commit = this.$store.commit
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapMutations', namespace)
        if (!module) {
          return
        }
        
        commit = module.context.commit
      }

      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    }
  })
  
  return res
});

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var mapGetters = exports.mapGetters = normalizeNamespace((namespace, getters) => {
  const res = {}
  if (!isValidMap(getters)) {
    console.error('[weux] mapGetters: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(getters).forEach(({ key, val }) => {
    val = namespace + val
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }

      if (!(val in this.$store.getters)) {
        console.error(`[weux] unknown getter: ${val}`)
        return
      }

      return this.$store.getters[val]
    }
  })

  return res
});


if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var mapActions = exports.mapActions = normalizeNamespace((namespace, actions) => {
  const res = {}
  if (!isValidMap(actions)) {
    console.error('[weux] mapActions: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(actions).forEach(({ key, val }) => {
    res[key] = function mappedAction (...args) {
      let dispatch = this.$store.dispatch
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapActions', namespace)
        if (!module) {
          return
        }

        dispatch = module.context.dispatch
      }

      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    }
  })

  return res
});

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var createNamespacedHelpers = exports.createNamespacedHelpers = (namespace) => ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
});

function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }

  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}


function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

function normalizeNamespace (fn) {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }

    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace]
  
  if (!module) {
    console.error(`[weux] module namespace not found in ${helper}(): ${namespace}`)
  }

  return module
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128550, function(require, module, exports) {
var __TEMP__ = require('../observer/index');var initState = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../observer/watch');var initWatch = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../navigate/index');var linkTo = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../navigate/navigateTo');var route = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./globalData');var globalData = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../observer/updateComputed');var updateComputed = __TEMP__['updateComputed'];
var __TEMP__ = require('../helper/handleData');var handleData = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../observer/updateComputed');var ctxTarget = __TEMP__['ctxTarget'];
var __TEMP__ = require('../helper/hookEvent');var hookEvent = __REQUIRE_DEFAULT__(__TEMP__);

const originalPage = Page

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = Page = function (options = {}) {
  options.$global = globalData
  options.$route = route

  const lifeTimesBackup = {
    onLoad: options.onLoad,
    onShow: options.onShow,
    onHide: options.onHide,
    onUnload: options.onUnload,
  }

  options.onLoad = function (config) {
    hookEvent(this)
    const { data, computed } = this
    initState(this, data, computed)
    
    wx.nextTick(() => {
       handleData(this)
    })

    lifeTimesBackup.onLoad && lifeTimesBackup.onLoad.call(this, config)
  }

  options.onShow = function () {
    initWatch(this, this.watch)
    updateComputed('showUpdate')
    lifeTimesBackup.onShow && lifeTimesBackup.onShow.call(this)
  }

  options.onHide = function () {
    const ctxResult = ctxTarget()
    ctxResult.map(ctx => {
       ctx._rawBack = ctx._rawData
       ctx._rawStringify = JSON.stringify(ctx._rawData)
    })
    
    lifeTimesBackup.onHide && lifeTimesBackup.onHide.call(this)
  }

  options.onUnload = function () {
    const computedWatchers = this._computedWatchers
    if (computedWatchers && Object.keys(computedWatchers).length) {
        Object.keys(computedWatchers).forEach(key => computedWatchers[key].teardown())
    }

    this._rawData = null
    this._computedWatchers = null
    this.$store = null
    this.$bus = null

    lifeTimesBackup.onUnload && lifeTimesBackup.onUnload.call(this)
  }

  options.routeTo = function (e) {
    return linkTo(e)
  }

  return originalPage(options)
};
}, function(modId) { var map = {"../observer/index":1625979128551,"../observer/watch":1625979128556,"../navigate/index":1625979128558,"../navigate/navigateTo":1625979128559,"./globalData":1625979128560,"../observer/updateComputed":1625979128557,"../helper/handleData":1625979128561,"../helper/hookEvent":1625979128562}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128551, function(require, module, exports) {
var __TEMP__ = require('./reactive');var reactive = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./computed');var initComputed = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function initState (ctx, target, computed) {
    reactive(target)
    initComputed(ctx, target, computed)
};exports.default = initState
}, function(modId) { var map = {"./reactive":1625979128547,"./computed":1625979128552}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128552, function(require, module, exports) {
var __TEMP__ = require('./watcher');var Watcher = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../helper/utils');var noop = __TEMP__['noop'];
var __TEMP__ = require('./updateComputed');var addStack = __TEMP__['addStack'];var updateComputed = __TEMP__['updateComputed'];
var __TEMP__ = require('./dep');var Dep = __REQUIRE_DEFAULT__(__TEMP__);

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function initComputed (ctx, target, computed) {
    addStack(ctx)

    const computedMap = {}
    const watchers = ctx._computedWatchers = {}
    ctx._computedMap = {}

    for (const key in computed) {
        const userDef = computed[key]
        const getter = typeof userDef === 'function' ? userDef.bind(ctx) : userDef.get
        
        if (key in target) {
            console.error(`The computed property "${key}" is already defined in data`)
            continue
        } else {
            defineComputed(ctx, target, key, userDef)
        }
		
        const watcher = watchers[key] = new Watcher(ctx, getter || noop, () => {
           ctx._computedMap[key] = watcher.value
           updateComputed()
        }, { lazy: true })
        
        computedMap[key] = target[key]
    }
    
    try {
        ctx.setData(computedMap)
    } catch (e) {
        throw e
    }
};exports.default = initComputed

function defineComputed (ctx, target, key, userDef) {
    if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = createComputedGetter(ctx, key)
        sharedPropertyDefinition.set = noop
    } else {
        sharedPropertyDefinition.get = userDef.get
          ? createComputedGetter(ctx, key)
          : noop

        sharedPropertyDefinition.set = userDef.set
          ? userDef.set.bind(ctx)
          : noop
    }
    
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter (ctx, key) {
    return () => {
      const watcher = ctx._computedWatchers && ctx._computedWatchers[key]
      
      if (watcher) {
        if (watcher.dirty) {
            watcher.evaluate()
        }
        
        if (Dep.target) {
            watcher.depend()
        }
        
        return watcher.value
      }
    }
  }

}, function(modId) { var map = {"./watcher":1625979128553,"../helper/utils":1625979128546,"./updateComputed":1625979128557,"./dep":1625979128548}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128553, function(require, module, exports) {
var __TEMP__ = require('./dep');var Dep = __REQUIRE_DEFAULT__(__TEMP__);var pushTarget = __TEMP__['pushTarget'];var popTarget = __TEMP__['popTarget'];
var __TEMP__ = require('./traverse');var traverse = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./scheduler');var queueWatcher = __TEMP__['queueWatcher'];
var __TEMP__ = require('../helper/utils');var noop = __TEMP__['noop'];var parsePath = __TEMP__['parsePath'];var equal = __TEMP__['equal'];var isObject = __TEMP__['isObject'];
var __TEMP__ = require('./watch');var invokeWithWatch = __TEMP__['invokeWithWatch'];

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
        this.add = false
        this.invoke = true
        
        if (options) {
            this.deep = !!options.deep
            this.user = !!options.user
            this.lazy = !!options.lazy
            this.sync = !!options.sync
        } else {
            this.deep = this.user = this.lazy = this.sync = false
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
            if (this.deep) {
                if (!this.add) {
                    this.deepVal = JSON.parse(JSON.stringify(value))
                    this.add = true
                }
                traverse(value)
            }

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
        let value = this.getWatcher()
        
        if (
          value !== this.value ||
          isObject(value) ||
          this.deep
        ) {
          let oldVal
          if (this.deep) {
              oldVal = this.deepVal
              if (equal(oldVal, value)) {
                  this.invoke = false
              } else {
                  this.invoke = true
              }

              this.deepVal = JSON.parse(JSON.stringify(value))
          } else {
              oldVal = this.value
          }
          this.value = value
          
          if (this.invoke) {
            if (this.user) {
                try {
                    invokeWithWatch(this, value, oldVal)
                } catch (e) {
                    console.error(e)
                }
            } else {
                invokeWithWatch(this, value, oldVal)
            }
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

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = Watcher;

}, function(modId) { var map = {"./dep":1625979128548,"./traverse":1625979128554,"./scheduler":1625979128555,"../helper/utils":1625979128546,"./watch":1625979128556}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128554, function(require, module, exports) {
var __TEMP__ = require('../helper/utils');var isObject = __TEMP__['isObject'];

const seenObjects = new Set()

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function traverse (val) {
  seenObjects.clear()
  _traverse(val, seenObjects)
};exports.default = traverse

function _traverse (val, seen) {
  let i, keys
  const isA = Array.isArray(val)
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  
  if (isA) {
    i = val.length
    while (i--) _traverse(val[i], seen)
  } else {
    keys = Object.keys(val)
    i = keys.length
    while (i--) _traverse(val[keys[i]], seen)
  }
}
}, function(modId) { var map = {"../helper/utils":1625979128546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128555, function(require, module, exports) {
var __TEMP__ = require('../helper/utils');var asyncLock = __TEMP__['asyncLock'];

const queue = []
let has = {}
let circular = {}
let flushing = false
let curIndex = 0
const lockTask = asyncLock()
const MAX_UPDATE_COUNT = 100

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function queueWatcher (watcher) {
  if (!watcher.id && typeof watcher === 'function') {
    watcher = {
      id: Infinity,
      run: watcher
    }
  }
  
  if (!has[watcher.id] || watcher.id === Infinity) {
    has[watcher.id] = true
    if (!flushing) {
      queue.push(watcher)
      lockTask(flushQueue, resetQueue)
    } else {
      let i = queue.length - 1
      while (i > curIndex && watcher.id < queue[i].id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
  }
};exports.queueWatcher = queueWatcher

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function dequeueWatcher (watcher) {
  if (!watcher.id || !has[watcher.id]) return
  const index = queue.indexOf(watcher)
  if (index > -1) {
    queue.splice(index, 1)
    has[watcher.id] = false
  }
};exports.dequeueWatcher = dequeueWatcher

function flushQueue () {
  flushing = true
  queue.sort((a, b) => a.id - b.id)
  for (curIndex = 0; curIndex < queue.length; curIndex++) {
    const watcher = queue[curIndex]
    const id = watcher.id
    if (id !== Infinity) {
      delete has[id]
      circular[id] = (circular[id] || 0) + 1
        if (circular[id] > MAX_UPDATE_COUNT) {
          let location = watcher.vm && watcher.vm.is
          console.error(`You may have a dead circular update in watcher with expression, please check!`, location)
          break
        }
    }
    
    watcher.run()
  }
  resetQueue()
}

function resetQueue () {
  flushing = false
  curIndex = queue.length = 0
  has = {}
  circular = {}
}
}, function(modId) { var map = {"../helper/utils":1625979128546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128556, function(require, module, exports) {
var __TEMP__ = require('./watcher');var Watchers = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../helper/utils');var isObject = __TEMP__['isObject'];var noop = __TEMP__['noop'];var strToUpperCase = __TEMP__['strToUpperCase'];
var __TEMP__ = require('./updateComputed');var ctxTarget = __TEMP__['ctxTarget'];
let called = false
const watchMap = new Map()

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function initWatch (ctx, watch) {
  for (let key in watch) {
    let handler = watch[key]

    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(ctx, key, handler[i])
      }
    } else {
      createWatcher(ctx, key, handler)
    }
  }
};exports.default = initWatch

function createWatcher (ctx, fn, cb, options) {
  if (isObject(cb)) {
      options = cb
      cb = cb.handler
  }
  
  if (typeof cb === 'string') {
      if (ctx[cb]) {
          cb = ctx[cb]
      } else {
          cb = noop
      }
  }

  watch(ctx, fn, cb, options)
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function watch (ctx, fn, cb, options) {
  if (isObject(cb)) {
      return createWatcher(ctx, fn, cb, options)
  }

  cb = cb || noop
  options = options || {}
  options.user = true
  let Watcher
  if (Watchers && Watchers.default) {
	  Watcher = Watchers.default
  } else {
	  Watcher = Watchers
  }
  const watcher = new Watcher(ctx, fn, cb, options)

  if (options.immediate) {
      cb.call(ctx, watcher.value)
  }

  return function unwatch () {
    watcher.teardown()
  }
};exports.watch = watch

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function invokeWithWatch (ctx, newVal, oldVal) {
  const ctxMap = ctxTarget()
  const ctxResut = ctxMap.map(item => item.is)
  const current = ctx.vm.is
  const cbName = ctx.cb.name
  const fnName = ctx.fn === cbName ? ctx.fn : `${ctx.fn}${strToUpperCase(cbName)}`

  if (ctxResut.includes(current)) {
      if (watchMap.size) {
          if (watchMap.has(current)) {
              let fnMap = watchMap.get(current)
              if (!fnMap.includes(fnName)) {
                  fnMap.push(fnName)
                  ctx.cb.call(ctx.vm, newVal, oldVal)
              }
          } else {
              const funcNames = []
              funcNames.push(fnName)
              watchMap.set(current, funcNames)
              ctx.cb.call(ctx.vm, newVal, oldVal)
          }
      } else {
          const funcNames = []
          funcNames.push(fnName)
          watchMap.set(current, funcNames)
          ctx.cb.call(ctx.vm, newVal, oldVal)
      }
  }

  if (!called) {
      wx.nextTick(() => {
         watchMap.clear()
         called = false
      })

      called = true
  }
};exports.invokeWithWatch = invokeWithWatch
}, function(modId) { var map = {"./watcher":1625979128553,"../helper/utils":1625979128546,"./updateComputed":1625979128557}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128557, function(require, module, exports) {
let update = false
let add = false
const ctxStack = []
let temp = []

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function updateComputed (arg) {
   if (!update) {
      wx.nextTick(() => {
         const targetMap = ctxTarget()

         targetMap.map(ctx => {
            const computedMap = ctx._computedMap
            
            if (computedMap && Object.keys(computedMap).length) {
               try {
                  if (arg == 'showUpdate') {
                     ctx._rawData = JSON.parse(ctx._rawStringify)
                     ctx._rawStringify = null
                  } else {
                     if (ctx._rawBack) {
                        ctx._rawData = ctx._rawBack
                        ctx._rawBack = null
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
};exports.updateComputed = updateComputed

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function addStack (ctx) {
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
};exports.addStack = addStack

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function ctxTarget () {
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
};exports.ctxTarget = ctxTarget

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128558, function(require, module, exports) {
var __TEMP__ = require('./navigateTo');var navigateTo = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function navigate (event) {
    let { url, routeType, delta } = event.currentTarget.dataset
    let type = routeType ? routeType : 'navigateTo'
    let num = delta ? delta : 1

    if (routeType == 'navigateBack') {
        const pages = getCurrentPages()
        if (pages.length > 1) {
            navigateTo(url = 'empty', type, { delta: Number(num) })
        } else {
            console.warn('navigateBack the navigate type must be navigateTo')
        }
    } else {
        navigateTo(url, type)
    }
};exports.default = navigate
}, function(modId) { var map = {"./navigateTo":1625979128559}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128559, function(require, module, exports) {
var __TEMP__ = require('../helper/utils');var isPlainObject = __TEMP__['isPlainObject'];

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function routeTo (...args) {
  let url = args[0], type = 'navigateTo', params= {}

  if (args.length == 2) {
    if (isPlainObject(args[1])) {
        params = args[1]
    }

    if (typeof args[1] == "string") {
        type = args[1]
    }
  }

  if (args.length == 3) {
      type = args[1]
      params = isPlainObject(args[2]) ? args[2] : {}
  } 
  
  if (type == 'navigateBack') {
      try {
        wx.navigateBack(params)
      } catch (e) {
        console.error(e)
      }
  } else {
    if (!url) {
        throw Error('The url should be string and not empty')
    }
   
   const typeArray =  ['navigateTo', 'reLaunch', 'redirectTo']
   if (typeArray.includes(type)) {  //可以传参的跳转方式
       if (Object.keys(params).length) {  //带参数
         for (const [key, value] of Object.entries(params)) {
           if (url.indexOf('?') > 0) {
               url += `&${key}=${value}`
            } else {
               url += `?${key}=${value}`
            }
         }
       }
 
       navigateTo(url, type)
   } else {
       try {
         let index = url.indexOf('?')
         let route = index > 0 ? url.substring(0, index) : url
         wx.switchTab({ url: route })
       } catch (err) {
         console.error(err)
       }
    }
  }
};exports.default = routeTo

function navigateTo (url, type) {
  if (type == 'navigateTo') {
      wx.navigateTo({ url })
  } else if (type == 'reLaunch') {
      wx.reLaunch({ url })
  } else {
      wx.redirectTo({ url })
  }
}
}, function(modId) { var map = {"../helper/utils":1625979128546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128560, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function global (name, value) {
    let globalData = getApp().globalData

    if (arguments.length === 0) {
        return globalData
    }

    if (isString(name)) {
        const path = name.replace(/\[(\d+)\]/g, '.$1').split('.')

        if (arguments.length === 1) {
            value = path.reduce((acc, cur) => acc[cur], globalData)
            return value
        }
    
        if (arguments.length === 2) {
            path.reduce((acc, cur, index) => {
                if (index == path.length - 1) {
                    acc[cur] = value
                }
    
                return acc[cur]
            }, globalData)
            
            return globalData
        }
    }
};exports.default = global

function isString(val) {
	return Object.prototype.toString.call(val) === '[object String]'
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128561, function(require, module, exports) {
var __TEMP__ = require('./utils');var equal = __TEMP__['equal'];var isMixObject = __TEMP__['isMixObject'];var isPlainObject = __TEMP__['isPlainObject'];

let watcherValue, equalValue, computedMap = {}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function handleData (ctx) {
  if (ctx.$store) {
      const { _computedWatchers: watchersMap, $store: { _rawState: rawState } } = ctx
      Object.keys(watchersMap).forEach(key => {
        const value = watchersMap[key].value
        if (isMixObject(value)) {
            watcherValue = value
            handleState(rawState)
            computedMap[key] = equalValue
        }
      })
    
      ctx._rawData = { ...ctx._rawData, ...computedMap }
      computedMap = {}
  }
};exports.default = handleData

function handleState (data) {
    for (let key in data) {
      let value = data[key]

      if (isMixObject(value)) {
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
}, function(modId) { var map = {"./utils":1625979128546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128562, function(require, module, exports) {
var __TEMP__ = require('../navigate/index');var navigate = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../navigate/navigateTo');var routeTo = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../eventBus/index');var eventBus = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../axios/index');var httpRequest = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../globalProxy/globalData');var globalData = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./diff');var diffData = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../observer/watch');var globalWatch = __TEMP__['watch'];

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function hook (ctx, hookType) {
    const { proxyData } = getApp()
    if (proxyData && proxyData.store) {
        ctx.$store = proxyData.store
    }
	
	if (proxyData && proxyData.api) {
        ctx.$api = proxyData.api
    }

    if (proxyData && proxyData.axios) {
        const { axios } = proxyData
        ctx.$axios = axios
    } else {
        ctx.$axios = httpRequest
    }
    ctx.$bus = eventBus

    if (hookType == 'component') {
        ctx.$route = routeTo
        ctx.$global = globalData

        ctx.routeTo = function (e) {
          return navigate(e)
        }
    }
    
    ctx.$watch = function (fn, cb, op) {
       return globalWatch(ctx, fn, cb, op)
    }

    const { setData, data } = ctx
    ctx._setDataBackup = { setData }
    ctx._rawData = JSON.parse(JSON.stringify(data))

    ctx.setData = function (data, callback) {
       diffData(ctx, data, callback)
    }
};exports.default = hook
}, function(modId) { var map = {"../navigate/index":1625979128558,"../navigate/navigateTo":1625979128559,"../eventBus/index":1625979128563,"../axios/index":1625979128534,"../globalProxy/globalData":1625979128560,"./diff":1625979128564,"../observer/watch":1625979128556}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128563, function(require, module, exports) {
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

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = new EventBus();
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128564, function(require, module, exports) {
var __TEMP__ = require('./utils');var getObjByKey = __TEMP__['getObjByKey'];var isNotEmptyObject = __TEMP__['isNotEmptyObject'];var noop = __TEMP__['noop'];

const ARRAYTYPE = '[object Array]'
const OBJECTTYPE = '[object Object]'
const FUNCTIONTYPE = '[object Function]'
let resultMap = [], ctxMap = []

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function diffData (ctx, data, cb) {
    data = JSON.parse(JSON.stringify(data))
    const diffResult = diff(data, ctx._rawData)
    const result = getObjByKey(diffResult)
    
    let isNotEmptyObj = !!isNotEmptyObject(result)
    cb = cb || noop
    let { _setDataBackup: { setData } } = ctx

    if (isNotEmptyObj) {
        setData.call(ctx, result, cb)

        resultMap.push(result)
        ctxMap.push(ctx)
        wx.nextTick(() => {
            if (resultMap.length) {
                resultMap.map((obj, index) => {
                    let context = ctxMap[index]
                    Object.keys(obj).forEach(key => {
                        updateRawData(context, key, obj[key])
                    })
                })

                resultMap = [], ctxMap = []
            }
        })
    }
};exports.default = diffData

function updateRawData (ctx, key, value) {
    const path = key.replace(/\[(\d+)\]/g, '.$1').split('.')
    
    path.reduce((acc, cur, index) => {
        if (index == path.length - 1) {
            acc[cur] = value
        }

        return acc[cur]
    }, ctx._rawData)
}
 
function diff (current, pre) {
    const result = {}
    syncKeys(current, pre)
    _diff(current, pre, '', result)
    return result
}

function syncKeys (current, pre) {
    if (current === pre) return
    const rootCurrentType = type(current)
    const rootPreType = type(pre)
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
          for (let key in pre) {
              const currentValue = current[key]
              if (currentValue === undefined) {
                  current[key] = null
              } else {
                  syncKeys(currentValue, pre[key])
              }
          }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach((item, index) => {
                syncKeys(current[index], item)
            })
        }
    }
}

function _diff (current, pre, path, result) {
    if (current === pre) return
    const rootCurrentType = type(current)
    const rootPreType = type(pre)
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current)
        } else {
            for (let key in current) {
                const currentValue = current[key]
                const preValue = pre[key]
                const currentType = type(currentValue)
                const preType = type(preValue)
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue)
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue)
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue)
                        } else {
                            currentValue.forEach((item, index) => {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result)
                            })
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue)
                    } else {
                        for (let subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result)
                        }
                    }
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current)
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current)
            } else {
                current.forEach((item, index) => {
                    _diff(item, pre[index], path + '[' + index + ']', result)
                })
            }
        }
    } else {
        setResult(result, path, current)
    }
}

function setResult (result, k, v) {
    if (type(v) != FUNCTIONTYPE) {
        result[k] = v
    }
}

function type (obj) {
    return Object.prototype.toString.call(obj)
}
}, function(modId) { var map = {"./utils":1625979128546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625979128565, function(require, module, exports) {
var __TEMP__ = require('../observer/index');var initState = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../observer/watch');var initWatch = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../helper/utils');var noop = __TEMP__['noop'];
var __TEMP__ = require('../helper/handleData');var handleData = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../helper/hookEvent');var hookEvent = __REQUIRE_DEFAULT__(__TEMP__);

const myBehavior = Behavior({
  lifetimes: {
    attached: function () {
      hookEvent(this, 'component')
    }
  }
})

const originalComponent = Component
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = Component = function (config = {}) {
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
};

function teardown (ctx) {
  const computedWatchers = ctx._computedWatchers
  if (computedWatchers && Object.keys(computedWatchers).length) {
      Object.keys(computedWatchers).forEach(key => computedWatchers[key].teardown())
  }
}
}, function(modId) { var map = {"../observer/index":1625979128551,"../observer/watch":1625979128556,"../helper/utils":1625979128546,"../helper/handleData":1625979128561,"../helper/hookEvent":1625979128562}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625979128533);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map