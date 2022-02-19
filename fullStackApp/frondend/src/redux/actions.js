import React from 'react';
import axios from 'axios';

export const   initialState= {
                countries:[],
                activities:[],
		allSearch:[],
		currentPage:0,
		searchPerName:""
};
export const TYPE_GET_COUNTRIES="GET_COUNTRIES";
export const FILTER_PER_CONTINENT="FILTER_PER_CONTINENT";
export const FITTER_PER_PAGE_NEXT="FITTER_PER_PAGE_NEXT";
export const FITTER_PER_PAGE_PREVIOUS="FITTER_PER_PAGE_PREVIOUS";
export const FILTER_PER_STRING = "FILTER_PER_STRING"
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
export function filterPerContinent(dispatch,e){
	return dispatch({
        	type: FILTER_PER_CONTINENT,
        	payload:e
    	});
};

export function filterPerPageNext(dispatch,page){
	return dispatch({
		type:FITTER_PER_PAGE_NEXT,
		payload:page
	});
};

export function filterPerPagePrevious(dispatch,page){
	return dispatch({
		type:FITTER_PER_PAGE_PREVIOUS,
		payload:page
	});
};

export function filtrarSearchPerString(dispatch,e){
	return dispatch({
		type:FILTER_PER_STRING,
		payload:e
	});
};
