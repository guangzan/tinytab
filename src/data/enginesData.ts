export interface EngineItem {
    id: number
    name: string
    baseUrl: string
    placeholderText: string
    hotkeys?: string
    color: string
    category: number
    isDefault: boolean
}

const enginesData: Array<EngineItem> = [
    {
        id: 1,
        name: 'Baidu',
        baseUrl: 'https://www.baidu.com/s?ie=UTF-8&wd=',
        placeholderText: '百度一下，你就知道',
        hotkeys: 'ctrl+a',
        color: '#4E6EF2',
        category: 1,
        isDefault: true,
    },
    {
        id: 2,
        name: 'Bing',
        baseUrl: 'https://cn.bing.com/search?FORM=BESBTB&q=',
        placeholderText: 'Microsoft Bing',
        hotkeys: 'ctrl+f2',
        color: '#0c8484',
        category: 1,
        isDefault: false,
    },
    {
        id: 3,
        name: 'Google',
        baseUrl: 'https://www.google.com/search?q=',
        placeholderText: 'Google Search',
        hotkeys: 'f3',
        color: '#FBBC05',
        category: 1,
        isDefault: false,
    },
    {
        id: 4,
        name: 'NPM',
        baseUrl: 'https://www.npmjs.com/search?q=',
        placeholderText: 'Build amazing things',
        hotkeys: 'f5',
        color: '#ea4335',
        category: 1,
        isDefault: false,
    },
    {
        id: 5,
        name: 'Github',
        baseUrl: 'https://github.com/search?q=',
        placeholderText: 'Where the world builds software',
        hotkeys: 'f6',
        color: '#95E9D9',
        category: 1,
        isDefault: false,
    },
    {
        id: 6,
        name: 'Yuque',
        baseUrl: 'https://yuque.com/search?related=true&q=',
        placeholderText: '专业的云端知识库',
        hotkeys: 'f6',
        color: '#28c46f',
        category: 1,
        isDefault: false,
    },
    {
        id: 7,
        name: 'Sougou',
        baseUrl: 'https://www.sogou.com/web?query=',
        placeholderText: '上网从搜狗开始',
        hotkeys: 'f4',
        color: '#ff6f17',
        category: 1,
        isDefault: false,
    },
]

export default enginesData
