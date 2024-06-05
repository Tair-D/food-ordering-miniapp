import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom';
import ProductList from "./pages/ProductList/index.jsx";
import Registration from "./pages/Registration/index.jsx";
import ConfirmationPage from "./pages/Confirmation/index.jsx";
import ShippingInfo from "./pages/ShippingInfo/index.jsx";

const test = [
	{
		"id": "2",
		"title": "Куртка",
		"price": 12000,
		"description": "Зеленого цвета, теплая",
		"image": "https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png",
		"count": 1
	},
	{
		"id": "1",
		"title": "Джинсы",
		"price": 5000,
		"description": "Синего цвета, прямые,Синего цвета, прямые,Синего цвета, прямые,Синего цвета, прямые,Синего цвета, прямые",
		"image": "https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png",
		"count": 1
	}
];

function App() {
	const {tg, onClose} = useTelegram();

	const showConfirmationDialog = () => {
		tg.showConfirm(
			"Are you sure you want to close?",
			function (confirm) {
				if (confirm) {
					// User confirmed to close, proceed with the close action
					onClose();
				} else {
					// User canceled, do nothing and keep the web app open
					tg.disableClosingConfirmation();
				}
			}
		);
	};

	useEffect(() => {
		tg.ready();
		tg.enableClosingConfirmation();
		tg.onEvent('close', showConfirmationDialog);

		// Cleanup the event listener on component unmount
		return () => {
			tg.offEvent('close', showConfirmationDialog);
		};
	}, [tg]);

	return (
		<div className="App">
			{/*<Header/>*/}
			<Routes>
				<Route index element={<ProductList/>}/>
				<Route path={'form'} element={<Registration/>}/>
				<Route path={'confirmation'} element={<ConfirmationPage/>}/>
				<Route path={'registration'} element={<ShippingInfo/>}/>
			</Routes>
		</div>
	);
}

export default App;