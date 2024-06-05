import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Confirmation.css';
import {useLocation} from "react-router-dom";
import '../ShippingInfo/ShippingInfo.css';

const ConfirmationPage = () => {
	const {tg, queryId} = useTelegram();
	const location = useLocation();
	const [address, setAddress] = useState('');
	const [receiverName, setReceiverName] = useState('');
	const [shopName, setShopName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [saveData, setSaveData] = useState(false);

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
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		};
	}, [onSendData, tg]);

	useEffect(() => {
		if (address && receiverName && shopName) {
			tg.MainButton.show();
		} else {
			tg.MainButton.hide();
		}
	}, [address, receiverName, shopName, tg]);

	const handleAddressChange = (e) => setAddress(e.target.value);
	const handleReceiverNameChange = (e) => setReceiverName(e.target.value);
	const handleShopNameChange = (e) => setShopName(e.target.value);
	const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
	const handleSaveDataToggle = () => setSaveData(!saveData);

	const handleSubmit = (e) => {
		e.preventDefault();
		const shippingData = {address, receiverName, saveData};
		console.log(shippingData);
	};

	return (
		<div className="confirmation-page">
			<div className="container">
				<h2 className="cafe-order-header">Информация о доставке</h2>
				<form onSubmit={handleSubmit}>
					<div className="shipping-info">
						<div>
							<label className="label">Фамилия Имя Получателя:</label>
							<input
								type="text"
								value={receiverName}
								onChange={handleReceiverNameChange}
								className="input"
								required
							/>
						</div>
						<div>
							<label className="label">Название магазина:</label>
							<input
								type="text"
								value={shopName}
								onChange={handleShopNameChange}
								className="input"
								required
							/>
						</div>
						<div>
							<label className="label">Адрес:</label>
							<input
								type="text"
								value={address}
								onChange={handleAddressChange}
								className="input"
								required
							/>
						</div>
						<div>
							<label className="label">Номер телефона:</label>
							<input
								type="tel"
								value={phoneNumber}
								onChange={handlePhoneNumberChange}
								className="input"
								required
								pattern="\+7\(\d{3}\)\d{7}"
								title="Введите валидный телефон номер"
							/>
						</div>
					</div>

					<div className="checkbox-container">
						<input
							type="checkbox"
							checked={saveData}
							onChange={handleSaveDataToggle}
							className="checkbox"
						/>
						<label className="label">Сохранить информацию для следующего раза</label>
					</div>
				</form>
			</div>
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

		</div>
	);
};

export default ConfirmationPage;
