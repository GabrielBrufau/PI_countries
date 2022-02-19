import React from 'react';
import './bottomNeon.css'

export default function BottoomNeon(props){
	function click(){
		console.log('clik')
	}
	return (
		<botton 
		 className="bottomNeon"
		 onClick={props.onClick}
		>
                                <span id="span1"></span>
                                <span id="span2"></span>
                                <span id="span3"></span>
                                <span id="span4"></span>
				{props.text}
		</botton>
	)
}
