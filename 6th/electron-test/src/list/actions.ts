import { Add, Remove, Selected } from './actionTypes';
import { AddCat, RemoveCat, ThingSelected } from '../interface';
export const addCat:AddCat = (name, id) => ({
    type: Add,
    id: Date.parse(`${new Date()}`),
    catName: name,
    selectedId: id
});
export const removeCat:RemoveCat = (catId) => ({
    type: Remove,
    id: catId
});
//这里使用antd的submenu组件之后不知道为什么明明只触发了一次帮i党的函数
//却会调用两次actions函数。。。
//第二次发送的id还是null
//草 原来是在父组件设置了监听 冒泡的时候又被捕获了 再发了一次
//怪不得在子组件怎么找都找不到原因
export const thingSelected:ThingSelected = (catId) => ({
    type: Selected,
    id: catId
})