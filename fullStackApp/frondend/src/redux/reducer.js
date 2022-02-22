import {
	initialState,
	TYPE_GET_COUNTRIES,
	FILTER_PER_CONTINENT,
	FITTER_PER_PAGE_NEXT,
	FITTER_PER_PAGE_PREVIOUS,
	FILTER_PER_STRING,
	FILTER_FROM_A_TO_Z,
	FILTER_FROM_Z_TO_A
} from './actions.js';

export default function rootReducer( state = initialState ,action){
		const allCountries= state.countries;
		switch (action.type){
			case TYPE_GET_COUNTRIES:
				return {
					...state,
					countries:action.payload
				};

			case	FILTER_PER_CONTINENT:
				console.log("fix 20 action.payload",action.payload)
				const res = allCountries
					     .filter(country=>country.continent === action.payload);
				return {
					...state,
					allSearch:res
				};

			case 	FITTER_PER_PAGE_NEXT:
				console.log("fix 21 action.payload",action.payload);
			
				const aux2 = [];
				if(allCountries[action.payload]){
                                 	for(var i=0;i<10;i++){   
                                        	aux2.push(allCountries[action.payload-i]);
                                 	};
                                 	console.log('#fix 22 aux2',aux2);
                                 
                 		}else{
                         	console.log('#fix 22 aux2',aux2);
                		}
                		return {
					...state,
					allSearch:aux2,
					currentPage:state.currentPage + 10
				};
			
			case  	FITTER_PER_PAGE_PREVIOUS:
					console.log("fix 23 action.payload",action.payload);
		
					const aux3 = [];
					if(allCountries[action.payload]){
 		                               for(var i=0;i<10;i++){   
                	                                aux3.push(allCountries[action.payload-i]);
                        		        };
                                		console.log('#fix 10 aux3',aux3);
                			}else{
                        		console.log('#fixError  11 aux2',aux3);
                			}
                		return {
					...state,
					allSearch:aux3,
					currentPage:state.currentPage -10
				};
			
			case 	FILTER_PER_STRING:
			 	const aux5 = allCountries.filter((e)=>{
                         	if(e.name.toString()
					.toLowerCase()
					.includes(action.payload.toLowerCase())){
                                						return e
                         	};
			 	});
                		return {
					...state,
					allSearch:aux5
				};

			case 	FILTER_FROM_A_TO_Z:
				const countriesFromAtoZ = state
							   .countries
							   .sort((a,b)=> a.name.localeCompare(b.name));
				return {
					...state,
					allSearch:countriesFromAtoZ
				}

			case FILTER_FROM_Z_TO_A:
				const countriesFromZtoA = state
							  .countries
							  .sort((a,b)=>b.name.localeCompare(a.name));
				return {
					...state,
					allSearch:countriesFromZtoA
				}
			default:
				return state
		};
};

