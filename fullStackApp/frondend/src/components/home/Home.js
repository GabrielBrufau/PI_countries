import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {countriesGetAll,
	filterPerContinent,
	filterPerPageNext,
	filterPerPagePrevious,
	filtrarSearchPerString,
	filterFromAtoZ,
	filterFromZtoA,
	filterLessPupulation,
	filterHigherPopulation
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

        const [countryFind,setCountryFind]=React.useState("");
console.log('#fixfrond 3 countries',countries,'activities',activities,"allSearch",allSearch)

React.useEffect(()=>{
	dispatch(countriesGetAll(dispatch))
},[dispatch]);

console.log('#fixfrond 4 countries',countries,'activities',activities,"allSearch",allSearch)

	function handleChangeSearchPerString(e){
		setCountryFind("");
		setSearch(e.target.value)
                console.log('Search',search);
                dispatch(filtrarSearchPerString(dispatch,search));
	};
	function handleFilterPerContinent(e){
		setCountryFind("");
		console.log('#fix 14 Search',e);
                dispatch(filterPerContinent(dispatch,e));
        };
	function handleFilterPerPageNext(){
		setCountryFind("");
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
		setCountryFind("");
                 const page = currentPage;
                 if(page > 0){
                 console.log('#fix 9 page>0',page);
                 dispatch(filterPerPagePrevious(dispatch,page));
                 }else{
                         console.log('#fix 8 page<=0',page);
                         dispatch(filterPerPageNext(dispatch,10));
                 };
        };
	function handleFilterFromAtoZ(){
		setCountryFind("A-Z");
		dispatch(filterFromAtoZ(dispatch));
	}
	function handleFilterFromZtoA(){
		setCountryFind("Z-A");
		dispatch(filterFromZtoA(dispatch));
	}
	function handleFilterHigherPopulation(){
		setCountryFind("Higher population");
		dispatch(filterHigherPopulation());
	};
	function handleFilterLessPopulation(){
		setCountryFind("Less population");
		dispatch(filterLessPupulation());
	};
	return (
		<div className="home">
				<Input 
                                        value={search}
                                        placeholder="search per name"
                                        onChange={handleChangeSearchPerString}
                                />
			<div className="box_additional_features">
					<BottomNeon
                                        text="<<"
                                        onClick={handleFilterPerPagePrevious}
                                        />
                                        <BottomNeon
                                        text=">>"
                                        onClick={handleFilterPerPageNext}
                                        />
					<BottomNeon
					text="A - Z"
					onClick={handleFilterFromAtoZ}
					/>
					<BottomNeon
					text="Z - A"
					onClick={handleFilterFromZtoA}
					/>
					<BottomNeon
                                        text="Less population"
                                        onClick={handleFilterLessPopulation}
                                        />
					<BottomNeon
                                        text="Higher population"
                                        onClick={handleFilterHigherPopulation}
                                        />

			</div>
			<div className="box_continent">
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
			<div className="box_additional_features">
			{countryFind && <BottomNeon
                                        text={countryFind}
                                        />}
			{allSearch && allSearch.map(country=>{
				const homeId="/home/"+country.id
                                return (

                                                <>
						<div className="continent">
							<Link to={homeId}>
                                                        <BottomNeon 
                                                          text={country.name}
                                                          flag={country.flag}
							  continent= {country.continent}
                                                        />
							</Link>
						</div>
                                                </>
                                        )
                        })}
			</div>
		</div>
	);
};
