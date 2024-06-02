import React from 'react';
import Button from "../Button";
import "./ProductionItem.css";

const ProductItem = ({product, className, onAdd}) => {

	const onAddHandler = () => {
		onAdd(product);
	};

	return (
		<div className={`product ${className} max-w-sm rounded overflow-hidden shadow-lg bg-white p-4`}>
			<div className="img h-48 bg-gray-200 flex items-center justify-center">
				<img src={product.image} alt={product.title} className="h-full w-full object-cover"/>
			</div>
			<div className="title font-bold text-xl mt-4">{product.title}</div>
			<div className="description text-gray-700 text-base mt-2">{product.description}</div>
			<div className="price text-lg mt-4">
				<span>Стоимость: <b>{product.price}</b></span>
			</div>
			<Button className="add-btn mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			        onClick={onAddHandler}>
				Добавить в корзину
			</Button>
		</div>
	);
};

export default ProductItem;