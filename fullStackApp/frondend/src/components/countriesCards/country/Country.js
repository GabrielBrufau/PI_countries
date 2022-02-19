import React from 'react';
import './country.css'
export default function Country(props){

	return (
                        <div className="country">
			  
			  <div>
			    <h1>{props.name}</h1>
			    <hr/>
                            <img src={props.flag}/>
			    <hr/>
			    <p>{props.continent}</p>
			  </div>
				
		 	  
                        </div>
        )
}


