import React from 'react';
import Button from "../Button";
import "./ProductionItem.css";

const ProductItem = ({product, className, onAdd}) => {

	const onAddHandler = () => {
		onAdd(product);
	};

	return (
		<div className={`product ${className}`}>
			<div className="img">
				<img src={product.image} alt={product.title} className="img"/>
			</div>
			<div className="title">{product.title}</div>
			<div className="description">{product.description}</div>
			<div className="price">
				<span>Стоимость: <b>{product.price}</b></span>
			</div>
			<Button className="add-btn"
			        onClick={onAddHandler}>
				`{product.price}` Добавить в корзину
			</Button>
		</div>
	);
};

export default ProductItem;