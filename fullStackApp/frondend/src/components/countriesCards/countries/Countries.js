import React, { useEffect } from 'react';
import Country from '../country/Country.js';
import {useSelector, useDispatch} from 'react-redux';
import {countriesGetAll} from '../../../redux/actions.js';

export default function Countries(props) {
	const dispatch = useDispatch();
        const countries = useSelector(state=>state.countries);

	console.log('initialstate se actualiza cuando uso useEffect',countries)	//#fix
	console.log('useEffect dispach',dispatch) //#fix
 	useEffect(()=>{
                dispatch(countriesGetAll(dispatch));
        },[dispatch]);   	
	console.log('countries.length',countries.length) //#fix
	return (
             	<div>
             	 <h1>React.Component Countries</h1>
		 <Country/>
                 {true && countries.map(country=>{
		 			return (
						<Country
							name={country.countries.name}
						/>
		 			)
		 	  })
		 }
		</div>
        );

}

