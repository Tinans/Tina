import { flattenHeaders } from '../utils'

export default function dispatchRequest(config) {
	processConfig(config)
	return wxRequest(config).then(res => {
		return transformResponse(res, config)
	})
}

function processConfig(config) {
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