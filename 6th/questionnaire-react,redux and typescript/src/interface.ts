//单个opt对象
export interface opt1 {
    parId: number
    order: number
    index: number
    content?: string
    count: number
}
//单个que对象
export interface que1 {
    parId?: number
    order?: number
    type?: string
    question?: string
    must?: boolean
    submitCount?: number
    answer?: Array<any>
}
//单个data对象
export interface data1 {
    id: number
    state?: string
    name?: string
    deadline?: string
    submit?: number
}
//mapstatetprops获取的单个state数组
export interface dataState extends Array<any> {
    [index: number]: opt1 | que1 | data1
    
}
export interface state {
    [name: string]: dataState | string | number
}
export interface action1 {
    type: string
    id?: number | null
    order?: number
    index?: number
    deadline?: string
    content?: string
    parIndex?: number
    parentId?: number
    number?: number
    answer?: string
    count?: number
    queType?: string
    title?: string
}
export interface emptyObj {
    [name: string]: any
}
export interface emptyArr extends Array<any> {
    [index: number]: any
}