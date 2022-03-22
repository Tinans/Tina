export default function global (name, value) {
    let globalData = getApp().globalData

    if (arguments.length === 0) {
        return globalData
    }

    if (isString(name)) {
        const path = name.replace(/\[(\d+?)\]/g, '.$1').split('.')

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
}

function isString(val) {
	return Object.prototype.toString.call(val) === '[object String]'
}