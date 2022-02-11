import {
	initialState,
	TYPE_GET_COUNTRIES
} from './actions.js';

export default function rootReducer( state = initialState ,action){
		switch (action.type){
			case TYPE_GET_COUNTRIES:
				return {
					...state,
					countries:action.payload
				}
			default:
				return state
		}
	}

