import React from 'react';
import './button.css';

const Button = (props) => {
	return (
		<button {...props} className={`btn ${className} button`}/>
	);
};

export default Button;