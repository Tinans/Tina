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

export default defaults
