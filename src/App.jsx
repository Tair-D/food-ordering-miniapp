import React, {useEffect} from 'react';
import './App.css';
import {useTelegram} from "./hooks/useTelegram";

function App() {
	const {tg, user, onToggleButton} = useTelegram();

	useEffect(() => {
		tg.ready();
	}, []);

	console.log("user", user);

	const onClose = () => {
		tg.close();
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
				<h1 className="text-2xl font-bold mb-4">Food Ordering Miniapp</h1>
				<h2 className="text-xl font-semibold mb-2">Menu</h2>

				<h2 className="text-xl font-semibold mb-2">Cart</h2>
				<button
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default App;
