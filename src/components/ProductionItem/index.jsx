import React from 'react';
import Button from "../Button";
import "./ProductionItem.css";

const ProductItem = ({product, className, onAdd}) => {

	const onAddHandler = () => {
		onAdd(product);
	};

	const truncateDescription = (description) => {
		return description.length > 30 ? description.substring(0, 30) + '...' : description;
	};

	return (
		<div className={`product ${className}`}>
			<div className="img">
				<img src={product.image} alt={product.title} className="img"/>
			</div>
			<div className="title">{product.title}</div>
			<div className="description">{truncateDescription(product.description)}</div>
			{/*<div className="price">*/}
			{/*	<span>Стоимость: <b>{product.price}</b></span>*/}
			{/*</div>*/}
			<Button className="add-btn" onClick={onAddHandler}>
				<span className="price-text">{product.price} ₸</span> <span className="add-icon">+</span>
			</Button>
		</div>
	);
};

export default ProductItem;