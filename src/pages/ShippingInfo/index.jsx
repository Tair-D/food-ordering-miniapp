import React, {useState} from 'react';
import './ShippingInfo.css';

const ShippingInfo = () => {
	const [address, setAddress] = useState('');
	const [receiverName, setReceiverName] = useState('');
	const [saveData, setSaveData] = useState(false);

	const handleAddressChange = (e) => setAddress(e.target.value);
	const handleReceiverNameChange = (e) => setReceiverName(e.target.value);
	const handleSaveDataToggle = () => setSaveData(!saveData);

	const handleSubmit = (e) => {
		e.preventDefault();
		const shippingData = {address, receiverName, saveData};
		// Add logic to handle shipping data submission, e.g., API call
		console.log(shippingData);
	};

	return (
		<div className="container">
			<h2>Shipping Information</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label className="label">Address:</label>
					<input
						type="text"
						value={address}
						onChange={handleAddressChange}
						className="input"
						required
					/>
				</div>
				<div>
					<label className="label">Receiver Name:</label>
					<input
						type="text"
						value={receiverName}
						onChange={handleReceiverNameChange}
						className="input"
						required
					/>
				</div>
				<div className="checkbox-container">
					<input
						type="checkbox"
						checked={saveData}
						onChange={handleSaveDataToggle}
						className="checkbox"
					/>
					<label className="label">Save this information for next time</label>
				</div>
			</form>
		</div>
	);
};

export default ShippingInfo;
