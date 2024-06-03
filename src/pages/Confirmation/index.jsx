import React, {useCallback, useEffect} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Confirmation.css';

const ConfirmationPage = ({order}) => {
	const {tg, queryId} = useTelegram();
	console.log("hrere", order);
	const onSendData = useCallback(() => {
		const data = {
			products: order,
			totalPrice: order?.reduce((acc, item) => acc + item.price * item.count, 0),
			queryId,
		};
		fetch('https://food-delivery-bot-8fa24de3ce48.herokuapp.com/web-data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		});
	}, [order, queryId]);

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		};
	}, [onSendData, tg]);

	return (
		<div className="confirmation-page">
			<h2 className="cafe-order-header">Your Order</h2>
			<div className="order-items">
				{order?.map(item => (
					<div key={item.id} className="order-item">
						<img src={item.image} alt={item.title} className="cafe-order-item-photo"/>
						<div className="order-item-details">
							<div className="cafe-order-item-title">
								<div>{item.title}</div>
							</div>
							<div className="cafe-order-item-counter">Кол-во: {item.count}</div>
							<div className="cafe-order-item-description">{item.description}</div>
							<div className="cafe-order-item-price">Цена: {item.price * item.count} ₸</div>
						</div>
					</div>
				))}
			</div>
			<div className="order-total">
				<span>Total Price: {order?.reduce((acc, item) => acc + item.price * item.count, 0)} ₸</span>
			</div>
		</div>
	);
};

export default ConfirmationPage;
