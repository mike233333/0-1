import { Reducer, ChangeEvent, ReactElement, Dispatch } from "react";

export interface UseContext {
    state: Object,
    dispatch:Dispatch<any>
}
export interface CombineReducerProp {
    [name: string]: Reducer<any, Object>
}
export interface ProviderProp {
    children: JSX.Element
}
//state
export interface SingleStateTask {
    parentId: number,
    taskId: number,
    title: string,
    time: string,
    done: boolean,
    content: string,
    [name:string]:any
}
export interface SingleStateList {
    id:number,
    catName:string,
    list:[SingleStateList]|[]
}
export interface StateFilter {
    name:string
}
//

//content
export interface OnInputChange {
    (event: React.ChangeEvent, item: string): void
}
export interface ContentThisState {
    title: string,
    time: string,
    content: string,
    [key: string]: any,
    parentId: number,
    taskId: number,
    done: boolean
}
export interface OnFinishFilter {
    (target: SingleStateTask,id: number,selected: number):void
}
export interface SearchTask {
    (taskId:number,task:[SingleStateTask]):SingleStateTask|undefined
}
//action
export interface AddTask {
    (obj:any,catId:number,selected:number):{type:string,task:any,id:number,selected:number}
}
export interface Display {
    ():{type:string}
}
export interface Edit {
    ():{type:string}
}
export interface Toggle {
    (taskId:number,bool:boolean):{type:string,id:number,done:boolean}
}
//reducer
export interface ContentAction {
    type:string
}
//



//list
export interface ClearSelected {
    (event:React.MouseEvent<HTMLDivElement,MouseEvent>,value:null):void
}
export interface CalTask {
    (state:{[name:string]:any},bool:boolean):number
}
export interface FindCatName {
    (id:number,data:[SingleStateList]):string
}
//action
export interface AddCat {
    (name:string,id:number):{type:string,id:number,catName:string,selectedId:number}
}
export interface RemoveCat {
    (catId:number):{type:string,id:number}
}
export interface ThingSelected {
    (catId:any):{type:string,id:any}
};
//reducer
export interface Clone<T> {
    (obj:T):T
}

//task
export interface TaskListObj {
    [name:string]:any
}
export interface RenderTree {
    (data:any):ReactElement
}
export interface SearchTask {
    (id:number,task:[SingleStateTask],filter:string):any
}
export interface ClearSelectedTask {
    (event:React.MouseEvent<HTMLDivElement,MouseEvent>,value:null):void
}
//action
export interface TaskAction{
    (name:string):{type:string,id?:number,taskName?:string,filter?:string}
}
export interface TaskAction2 {
    (taskId:number|any):{type:string,id:number,taskName?:string,filter?:string}
}
export interface TaskAction3{
    ():{type:string}
}
