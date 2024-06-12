import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Confirmation.css';
import {useLocation, useNavigate} from "react-router-dom";
import '../ShippingInfo/ShippingInfo.css';
import Cleave from 'cleave.js/react';

const ConfirmationPage = () => {
	const {tg, queryId} = useTelegram();
	const location = useLocation();
	const [address, setAddress] = useState('');
	const [receiverName, setReceiverName] = useState('');
	const [shopName, setShopName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [saveData, setSaveData] = useState(false);

	const order = location.state?.order || [];
	const navigate = useNavigate();

	const onSendData = useCallback(() => {
		if (saveData) {
			const userData = {
				address,
				receiverName,
				shopName,
				phoneNumber,
				saveData,
			};
			localStorage.setItem('userData', JSON.stringify(userData));
		} else {
			localStorage.removeItem('userData');
		}

		const data = {
			products: order.map(item => ({
				title: item.title,
				quantity: item.count,
				price: item.price
			})),
			totalPrice: order.reduce((acc, item) => acc + item.price * item.count, 0),
			queryId,
			address,
			receiverName,
			shopName,
			phoneNumber
		};
		fetch('https://food-delivery-bot-8fa24de3ce48.herokuapp.com/web-data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		});
	}, [order, queryId, address, receiverName, shopName, phoneNumber, saveData]);


	useEffect(() => {
		tg.MainButton.setParams({
			text: `Оформить заказ`
		});
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
			tg.MainButton.hide();
		};
	}, [onSendData, tg]);

	useEffect(() => {
		console.log("phoneNumber?.length", phoneNumber?.length);
		if (address && receiverName && shopName && phoneNumber?.length === 18) {
			tg.MainButton.show();
		} else {
			tg.MainButton.hide();
		}
	}, [address, receiverName, shopName, phoneNumber, tg]);

	const handleAddressChange = (e) => setAddress(e.target.value);
	const handleReceiverNameChange = (e) => setReceiverName(e.target.value);
	const handleShopNameChange = (e) => setShopName(e.target.value);
	const handlePhoneNumberChange = (e) => {
		const value = e.target.value;
		const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

		if (regex.test(value)) {
			setPhoneNumber(value);
		} else {
			// Handle invalid format if necessary
		}
	};


	const handleSaveDataToggle = () => setSaveData(!saveData);

	const handleEditClick = () => {
		navigate('/', {state: {order}});
	};

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem('userData'));
		if (savedData) {
			setAddress(savedData.address);
			setReceiverName(savedData.receiverName);
			setShopName(savedData.shopName);
			setPhoneNumber(savedData.phoneNumber);
			setSaveData(savedData.saveData);
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (saveData) {
			const userData = {
				address,
				receiverName,
				shopName,
				phoneNumber,
				saveData,
			};
			localStorage.setItem('userData', JSON.stringify(userData));
		} else {
			localStorage.removeItem('userData');
		}
		const shippingData = {address, receiverName, shopName, phoneNumber, saveData};
		console.log(shippingData);
	};
	return (
		<div className="confirmation-page">
			<div className="container">
				<h2 className="cafe-order-header">Информация о доставке</h2>
				<form onSubmit={handleSubmit}>
					<div className="shipping-info">
						<div>
							<label className="label">Ф.И.О Получателя:</label>
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
							<Cleave
								value={phoneNumber}
								onChange={handlePhoneNumberChange}
								className="input"
								options={{
									prefix: '+7',
									delimiters: [' (', ') ', '-', '-'],
									blocks: [2, 3, 3, 2, 2],
									numericOnly: true
								}}
								inputMode="tel"
								placeholder="+7 (___) ___-__-__"
								required
							/>
						</div>

					</div>

					<div className="checkbox-container" onClick={handleSaveDataToggle}>
						<input
							type="checkbox"
							checked={saveData}
							className="checkbox"
						/>
						<label className="label">Сохранить информацию для следующего заказа</label>
					</div>
				</form>
			</div>
			<div>
				<h2 className="cafe-order-header">Ваш Заказ</h2>
			</div>
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
			<button type="button" onClick={handleEditClick} className="edit-button">Редактировать заказ</button>
		</div>
	);
};

export default ConfirmationPage;
