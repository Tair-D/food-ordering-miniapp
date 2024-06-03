import React from 'react';
import './button.css';
import "../../App.css";

const Button = (props) => {
	return (
		<button {...props} className={`button ${props.className}`}/>
	);
};

export default Button;