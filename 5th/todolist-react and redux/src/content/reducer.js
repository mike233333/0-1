import * as actionTypes from './actionTypes';
import {ContentTypes} from '../constants';

export default (state=[],action)=>{
    switch(action.type){
        case actionTypes.Display:
            return ContentTypes.DISPLAY;
        case actionTypes.Edit:
            return ContentTypes.EDIT;
        default:
            return state;
    }
}