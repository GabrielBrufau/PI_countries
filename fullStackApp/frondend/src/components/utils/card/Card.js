import React from "react";
import {Link,useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import "./card.css";
export default function Card(){
	const {id} = useParams();
	const countries = useSelector(state=>state.countries);
	const country = countries.filter(c=>c.id===id)
	console.log('id',id)
	console.log('eseparams',useParams())
	console.log('country card',country)
	console.log('country[0].name',country[0].name)
	return (
		<>
		<div className="card">
		 <div>
			box1 = {country[0].name}
		 </div>
		 <div>
			box 2 = {country[0].id}
		 </div>
		</div>
		</>
	)
}
