export default class InterceptorManager {
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
}