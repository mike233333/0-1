import * as actionTypes from './actionTypes';
import {ContentTypes} from '../constants';
import { ContentAction } from '../interface';

export default function contentReducer(state=[],action:any){
    switch(action.type){
        case actionTypes.Display:
            return ContentTypes.DISPLAY;
        case actionTypes.Edit:
            return ContentTypes.EDIT;
        default:
            return state;
    }
}