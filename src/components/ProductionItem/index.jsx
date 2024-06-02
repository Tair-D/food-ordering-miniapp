import React, {useState} from 'react';
import Button from "../Button";
import "./ProductionItem.css";

const ProductItem = ({product, className, onAdd}) => {
	const [count, setCount] = useState(0);

	const onAddHandler = () => {
		setCount(count + 1);
		onAdd(product);
	};

	const onIncrementHandler = () => {
		setCount(count + 1);
		onAdd(product);
	};

	const onDecrementHandler = () => {
		if (count > 1) {
			setCount(count - 1);
		} else {
			setCount(0);
		}
	};

	const truncateDescription = (description) => {
		return description.length > 100 ? description.substring(0, 100) + '...' : description;
	};

	return (
		<div className={`product ${className}`}>
			<div className="img">
				<img src={product.image} alt={product.title} className="img"/>
			</div>
			<div className="title">{product.title}</div>
			<div className="description">{truncateDescription(product.description)}</div>
			<div className="price">
				<span>Стоимость: <b>{product.price}</b></span>
			</div>
			{count === 0 ? (
				<Button className="add-btn" onClick={onAddHandler}>
					<span className="price-text">{product.price} ₸</span> <span className="add-icon">+</span>
				</Button>
			) : (
				<div className="quantity-controls">
					<Button className="decrement-btn" onClick={onDecrementHandler}>-</Button>
					<span className="item-count">{count}</span>
					<Button className="increment-btn" onClick={onIncrementHandler}>+</Button>
				</div>
			)}
		</div>
	);
};

export default ProductItem;
