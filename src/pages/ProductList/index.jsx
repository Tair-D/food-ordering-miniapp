import React, {useEffect, useState} from 'react';
import './ProductList.css';
import {useTelegram} from "../../hooks/useTelegram";
import ProductItem from "../../components/ProductionItem/index.jsx";
import {useNavigate} from "react-router-dom";

export const products = [
	{
		id: '1',
		title: 'Джинсы',
		price: 5000,
		description: 'Синего цвета, прямые,Синего цвета, прямые,Синего цвета, прямые,Синего цвета, прямые,Синего цвета, прямые',
		image: 'https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png'
	},
	{
		id: '2',
		title: 'Куртка',
		price: 12000,
		description: 'Зеленого цвета, теплая',
		image: 'https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png'
	},
	{
		id: '3',
		title: 'Джинсы 2',
		price: 5000,
		description: 'Синего цвета, прямые',
		image: 'https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png'
	},
	{
		id: '4',
		title: 'Куртка 8',
		price: 122,
		description: 'Зеленого цвета, теплая',
		image: 'https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png'
	},
	{
		id: '5',
		title: 'Джинсы 3',
		price: 5000,
		description: 'Синего цвета, прямые',
		image: 'https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png'
	},
	{
		id: '6',
		title: 'Куртка 7',
		price: 600,
		description: 'Зеленого цвета, теплая',
		image: 'https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png'
	},
	{
		id: '7',
		title: 'Джинсы 4',
		price: 5500,
		description: 'Синего цвета, прямые',
		image: 'https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png'
	},
	{
		id: '8',
		title: 'Куртка 5',
		price: 12000,
		description: 'Зеленого цвета, теплая',
		image: 'https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png'
	},
];

const test = [
	{
		count: 1,
		description: "Зеленого цвета, теплая",
		id: "2",
		image: "https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png",
		price: 12000,
		title: "Куртка",
	}
];

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return acc + (item.price * (item.count || 1));
	}, 0);
};

const ProductList = () => {
	const [addedItems, setAddedItems] = useState([]);
	const {tg, queryId} = useTelegram();
	const navigate = useNavigate();
	console.log("addedItems", addedItems);
	// const onSendData = useCallback(() => {
	// 	const data = {
	// 		products: addedItems,
	// 		totalPrice: getTotalPrice(addedItems),
	// 		queryId,
	// 	};
	// 	fetch('https://food-delivery-bot-8fa24de3ce48.herokuapp.com/web-data', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(data)
	// 	});
	// }, [addedItems]);

	// useEffect(() => {
	// 	tg.onEvent('mainButtonClicked', onSendData);
	// 	return () => {
	// 		tg.offEvent('mainButtonClicked', onSendData);
	// 	};
	// }, [onSendData]);

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
				text: `К оформлению ${getTotalPrice(newItems)}`
			});
		}
	};

	const handleShowOrder = () => {
		navigate('/confirmation', {state: {order: test}});
	};

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
		</div>
	);
};

export default ProductList;