import React from 'react';
import './button.css';

const Button = (props) => {
	return (
		<button {...props}
		        className={`btn ${props.className} bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}/>
	);
};

export default Button;