import React from 'react';
import axios from 'axios';

export const   initialState= {
                countries:[],
                activities:[]
};
export const TYPE_GET_COUNTRIES="GET_COUNTRIES";
export const RUTA_COUNTRIES="http://localhost:3001/api/countries";
	
export function countriesGetAll(dispatch) {
	return async function(dispatch){
		let json = await axios.get(RUTA_COUNTRIES);
		return dispatch({
                                type:TYPE_GET_COUNTRIES,
                                payload:json.data
                });
	}
};

