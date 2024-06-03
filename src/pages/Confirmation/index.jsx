import React, {useCallback, useEffect} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Confirmation.css';
import {useLocation, useNavigate} from "react-router-dom";

const ConfirmationPage = () => {
	const {tg, queryId} = useTelegram();
	const location = useLocation();
	const order = location.state?.order || [];

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
		tg.MainButton.show();
		tg.MainButton.setParams({
			text: `Оформить`
		});
	}, []);

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		};
	}, [onSendData, tg]);

	const navigate = useNavigate();

	const handleOpenRegistration = () => {
		navigate('/registration');
	};

	return (
		<div className="confirmation-page">
			<h2 className="cafe-order-header">Ваш Заказ</h2>
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
							<div className="cafe-order-item-price">Цена: {item.price} ₸</div>
						</div>
					</div>
				))}
			</div>
			<div className="order-total">
				<span>Общая стоимость: {order?.reduce((acc, item) => acc + item.price * item.count, 0)} ₸</span>
			</div>
			<button onClick={handleOpenRegistration}>Register</button>
		</div>
	);
};

export default ConfirmationPage;
