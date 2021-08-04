export type EngineItem = {
    id: number
    name: string
    baseUrl: string
    placeholderText: string
    hotkeys?: string
    color: string
    category: number
    isDefault: boolean
    prefix: string
    suffix: string[]
}

export type EnginesData = EngineItem[]
