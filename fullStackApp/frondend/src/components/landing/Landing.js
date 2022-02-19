import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css'
import BottomNeon from '../utils/bottomNeon/BottomNeon.js'

export default function Landing(){

	return (
		 	<div className="landing">

                   		<Link to="/home">
				<BottomNeon text="start" />
              	  		</Link>
	         
		 	</div>
		
	)
}
