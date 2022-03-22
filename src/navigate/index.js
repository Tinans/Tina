import navigateTo from './navigateTo'

export default function navigate (event) {
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
}