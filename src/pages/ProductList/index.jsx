import React, {useEffect, useState} from 'react';
import './ProductList.css';
import {useTelegram} from "../../hooks/useTelegram";
import ProductItem from "../../components/ProductionItem/index.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {products} from "../utils.js";

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return acc + (item.price * (item.count || 1));
	}, 0);
};

const ProductList = () => {
	const {tg, queryId} = useTelegram();
	const navigate = useNavigate();
	const location = useLocation();
	const order = location.state?.order || [];
	const [addedItems, setAddedItems] = useState(order ? order : []);

	const onAdd = (product, remove = false) => {
		const alreadyAdded = addedItems.find(item => item.id === product.id);
		let newItems = [];

		if (alreadyAdded) {
			if (remove) {
				newItems = addedItems.filter(item => item.id !== product.id);
			} else {
				newItems = addedItems.map(item =>
					item.id === product.id ? {...item, count: product.count} : item
				);
			}
		} else {
			newItems = [...addedItems, {...product, count: product.count || 1}];
		}

		setAddedItems(newItems);

		if (newItems.length === 0) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
			tg.MainButton.setParams({
				text: `К оформлению ${getTotalPrice(newItems)} ₸`
			});
		}
	};

	const handleShowOrder = () => {
		navigate('/confirmation', {state: {order: addedItems}});
	};

	useEffect(() => {
		if (addedItems?.length > 0) {
			tg.MainButton.setParams({
				text: `К оформлению ${getTotalPrice(addedItems)} ₸`
			});
			tg.MainButton.show();
		} else {
			tg.MainButton.hide();
		}
	}, []);

	useEffect(() => {
		tg.onEvent('mainButtonClicked', handleShowOrder);
		return () => {
			tg.offEvent('mainButtonClicked', handleShowOrder);
		};
	}, [handleShowOrder, tg]);

	return (
		<div className={'cafe-page cafe-items'}>
			{products.map(item => (
				<ProductItem
					key={item.id}
					product={item}
					onAdd={onAdd}
					className={'item'}
					addedItems={addedItems}
				/>
			))}
			{/*<button onClick={handleShowOrder}>buy</button>*/}
		</div>
	);
};

export default ProductList;