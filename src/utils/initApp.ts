import enginesData from '../data/enginesData'

/**
 * 初始化 engines 数据
 */
function initEnginesData(): void {
    if (!localStorage.getItem('enginesData')) {
        localStorage.setItem('enginesData', JSON.stringify(enginesData))
    }
}

export default () => {
    initEnginesData()
}
