import React, {useEffect, useState} from 'react';
import Button from "../Button";
import "./ProductionItem.css";
import "../../App.css";

const ProductItem = ({product, className, onAdd, addedItems}) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const addedItem = addedItems?.find(item => item.id === product.id);
		if (addedItem) {
			setCount(addedItem.count || 1); // Assuming you might want to track count in addedItems
		} else {
			setCount(0);
		}
	}, [addedItems, product.id]);

	const onAddHandler = () => {
		setCount(1);
		onAdd(product);
	};

	const onIncrementHandler = () => {
		const updatedProduct = {...product, count: (count + 1)};
		setCount(count + 1);
		onAdd(updatedProduct);
	};

	const onDecrementHandler = () => {
		if (count > 1) {
			const updatedProduct = {...product, count: (count - 1)};
			setCount(count - 1);
			onAdd(updatedProduct);
		} else {
			setCount(0);
			onAdd(product, true); // Passing a second argument to indicate removal
		}
	};

	const truncateDescription = (description) => {
		return description.length > 20 ? description.substring(0, 20) + '...' : description;
	};

	return (
		<div className={`product ${className}`}>
			{count > 0 && <div className="cafe-item-counter">{count}</div>}
			<div className="img">
				<img src={product.image} alt={product.title} className="img"/>
			</div>
			<div className="title">{product.title}</div>
			<div className="description">{truncateDescription(product.description)}</div>
			{count === 0 ? (
				<Button className="add-btn" onClick={onAddHandler}>
					<span className="price-text">{product.price} ₸</span> <span className="add-icon">+</span>
				</Button>
			) : (
				<div className="quantity-controls">
					<Button className="decrement-btn" onClick={onDecrementHandler}>-</Button>
					<Button className="increment-btn" onClick={onIncrementHandler}>+</Button>
				</div>
			)}
		</div>
	);
};

export default ProductItem;
