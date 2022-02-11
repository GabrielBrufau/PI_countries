import React from 'react';

export default function Country(props){

	return (
                        <div>
			 <h1>React.Component Country</h1>
                         <h1>{props.name}</h1>
                         <h2>{props.continent}</h2>
                         <h2>{props.capital}</h2>
                        
                        </div>
        )
}


