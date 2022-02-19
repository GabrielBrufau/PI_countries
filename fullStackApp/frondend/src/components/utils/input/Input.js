import React from 'react';
import './input.css'

export default function Input(props){

	return (
		<div className="input">
			<span id="span1"></span>
                        <span id="span2"></span>
                        <input 
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
                        ></input>

		</div>
	)
}
