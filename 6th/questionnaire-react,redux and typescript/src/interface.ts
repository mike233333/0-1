import { Reducer, Dispatch } from "react";

//store
export interface UseContext {
    state: Object,
    dispatch: Dispatch<any>
}
export interface CombineReducerProp {
    [name: string]: Reducer<any, any>
}
export interface ProviderProp {
    children: JSX.Element
}

//opt
export interface singleOpt {
    parId: number
    order: number
    index: number
    content: string
    count: number
}
export interface arrayOpt extends Array<singleOpt>{}

//que
export interface singleQue {
    parId: number
    order: number
    type: string
    question: string
    must: boolean
    submitCount: number
    answer: Array<string>
}
export interface arrayQue extends Array<singleQue>{}
//data
export interface singleData {
    id: number
    state: string
    name: string
    deadline: string
    submit: number
}
export interface arrayData extends Array<singleData>{}

//craete
//create controller
export interface ControllerProps {
    bool: boolean
    addOpt: () => void
    removeQue: () => void
    upQue: () => void
    downQue: () => void
    copyQue: () => void
}
//create option
export interface OptProps {
    removeOpt: () => void
    updateOpt: (event: React.ChangeEvent) => void
    type: string
    content: string
    index: number
}
//create que
export interface QueProps {
    index:number
    item:singleQue
}
export interface FilterState {
    (opt:arrayOpt,id:number,index:number):arrayOpt
}
//create create
export interface FilterQue {
    (que:arrayQue,id:number):arrayQue
}
export interface FilterData {
    (data:arrayData,id:number):boolean
}

//list list
export interface CheckDate {
    (date:string,id?:number):boolean
}

//fill fill
export interface FilterSingleData {
    (data:arrayData,nowQueId:number):singleData
}