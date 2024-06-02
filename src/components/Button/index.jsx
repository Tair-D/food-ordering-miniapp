import React from 'react';
import './button.css';

const Button = (props) => {
	return (
		<button {...props} className={`btn ${props.className} button`}/>
	);
};

export default Button;