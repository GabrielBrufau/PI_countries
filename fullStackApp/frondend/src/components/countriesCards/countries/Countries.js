import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {countriesGetAll} from '../../../redux/actions.js';


import Country from '../country/Country.js';
import BottomNeon from '../../utils/bottomNeon/BottomNeon.js'


export default function Countries(props) {
	
	const dispatch = useDispatch();
        const countries = useSelector(state=>state.countries);

	console.log('#fixfrond 1 initialstate se actualiza cuando uso useEffect',countries)	//#fix
	console.log('#fixfrond 2 useEffect',dispatch) //#fix
 	useEffect(()=>{
                dispatch(countriesGetAll(dispatch));
        },[dispatch]); 
	
	return (
             	<div>
		 	<BottomNeon text="Details"/>
	        	{true && countries.map(country=>{
		 			return (
						<Country
							name={country.name}
						/>
		 			)
		 	})}
	
		</div>
        );

}

