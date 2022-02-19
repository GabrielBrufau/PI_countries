import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {countriesGetAll,
	filterPerContinent,
	filterPerPageNext,
	filterPerPagePrevious,
	filtrarSearchPerString
} from '../../redux/actions.js';
import Country from '../countriesCards/country/Country.js';
import Input from '../utils/input/Input.js'
import BottomNeon from'../utils/bottomNeon/BottomNeon.js'
import './home.css';

export default function Home(){

//redux
        const dispatch = useDispatch();  
        const countries = useSelector(state=>state.countries);
        const activities = useSelector(state=>state.activities);
	const allSearch = useSelector(state=>state.allSearch);
	const currentPage = useSelector(state=>state.currentPage);
	const searchPerName = useSelector(state=>state.searchPerName);
//react
        const [search,setSearch]=React.useState("");

        const [countryFind,setCountryFind]=React.useState([]);
console.log('#fixfrond 3 countries',countries,'activities',activities,"allSearch",allSearch)

React.useEffect(()=>{
	dispatch(countriesGetAll(dispatch))
},[dispatch]);

	function handleChangeSearchPerString(e){
		setSearch(e.target.value)
                console.log('Search',search);
                dispatch(filtrarSearchPerString(dispatch,search));
	};
	function handleFilterPerContinent(e){
		console.log('#fix 14 Search',e);
                dispatch(filterPerContinent(dispatch,e));
        };
	function handleFilterPerPageNext(){
        	const page = currentPage;
        	if(page > 0){
        	console.log('#fix 9 page>0',page);
        	dispatch(filterPerPageNext(dispatch,page));
        	}else{
			console.log('#fix 8 page<=0',page);
			dispatch(filterPerPageNext(dispatch,10));
		};
	};
	function handleFilterPerPagePrevious(){
                 const page = currentPage;
                 if(page > 0){
                 console.log('#fix 9 page>0',page);
                 dispatch(filterPerPagePrevious(dispatch,page));
                 }else{
                         console.log('#fix 8 page<=0',page);
                         dispatch(filterPerPageNext(dispatch,10));
                 };
        };

	return (
		<div className="home">
				<Input 
                                        value={search}
                                        placeholder="search per name"
                                        onChange={handleChangeSearchPerString}
                                />
		
			<div className="continent">
					<BottomNeon
                                        text="<<"
                                        onClick={handleFilterPerPagePrevious}
                                	/>
					<BottomNeon
                                        text=">>"
                                        onClick={handleFilterPerPageNext}
                                	/>
					<BottomNeon
                                        	text="Africa"
                                        	onClick={()=>handleFilterPerContinent("Africa")}
                                	/>
					<BottomNeon
                                                text="Europe"
                                                onClick={()=>handleFilterPerContinent("Europe")}
                                        />
					<BottomNeon
                                                text="Asia"
                                                onClick={()=>handleFilterPerContinent("Asia")}
                                        />
			
					<BottomNeon
                                        text="South America"
                                        onClick={()=>handleFilterPerContinent("South America")}
                                        />
					<BottomNeon
                                                text="Oceania"
                                                onClick={()=>handleFilterPerContinent("Oceania")}
                                        />
					<BottomNeon
                                        text="North America"
                                        onClick={()=>handleFilterPerContinent("North America")}
                                        />

			</div>
			
			{allSearch && allSearch.map(country=>{
                                return (

                                                <>
						<div className="continent">
                                                        <BottomNeon 
                                                          text={country.name}
                                                          
                                                        />
						</div>
                                                </>
                                        )
                        })};

			
                	 {countries && countries.map(country=>{
                                return (
						<>
							<BottomNeon 
							  text={country.name}
							  
							/>
                                                        <Country
                                                	  name={country.name}
							  flag={country.flag}
							  continent={country.continent}
                                                	/>
						</>
                                        )
                        })};
		
			
		</div>
	);
};
